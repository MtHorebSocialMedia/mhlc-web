// Docs for mailchimp marketing api:
// https://mailchimp.com/developer/marketing/api/

const mailchimp = require('@mailchimp/mailchimp_marketing');
const sgMail = require('@sendgrid/mail');
const { getLogger } = require('../utils/logger');

const logger = getLogger('mailService');

function getMailchimpClient() {
    mailchimp.setConfig({
        apiKey: process.env.MAILCHIMP_API_KEY,
        server: process.env.MAILCHIMP_SERVER_PREFIX,
    });
    return mailchimp;
}

function getSendgridClient() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return sgMail;
}

// https://mailchimp.com/developer/marketing/api/list-members/
// TODO Add interests selection
// request data should look like this with interest ids being the keys:
// interests: {
//     '0d8e5fee26': false,
//     '06241490b2': false,
//     a8bb9dec49: false,
//     '99c9a6d7e5': false,
//     '508115b57c': false,
//     '557aff0307': false,
//     '22a3865cfa': false,
//     '82ff227f58': false,
//     d29512912d: false
// },
async function addMemberToNewsletter(request) {
    const client = getMailchimpClient();
    const { id: listId } = await getNewsletterList(client);
    const response = {};
    try {
        await client.lists.addListMember(listId, {
            email_address: request.emailAddress,
            status: "pending",
            merge_fields: {
                "FNAME": request.firstName,
                "LNAME": request.lastName,
            }
        });
        response.success = true;
    } catch (error) {
        if (error.status === 400 && error.response && error.response.text.includes('Member Exists')) {
            response.success = false;
            response.memberExists = true;
        } else {
            throw error;
        }
    }
    return response;
}

async function getNewsletterList(client) {
    const congregationListName = process.env.MAILCHIMP_NEWSLETTER_LIST_NAME;
    const { lists } = await client.lists.getAllLists();
    return lists.find(list => list.name === congregationListName);
}

async function getNewsletterInterests() {
  const client = getMailchimpClient();
  const { id: listId } = await getNewsletterList(client);
  const { categories } = await client.lists.getListInterestCategories(listId);
  const newsletterInterests = (await Promise.all(categories.map(async (category) => {
      const { interests } = await client.lists.listInterestCategoryInterests(listId, category.id);
      return interests.map(interest => ({
          id: interest.id,
          name: interest.name,
          category_id: category.id,
          list_id: listId
      }));
  }))).flat();
  return newsletterInterests;
}

async function callPing() {
    const response = await mailchimp.ping.get();
    logger.debug(response);
}

async function sendMail(to, subject, html) {
    const from = process.env.SENDGRID_FROM_ADDRESS;
    const message = {
        to,
        from,
        subject,
        html
    };
    return getSendgridClient().send(message);
}

module.exports = { addMemberToNewsletter, getNewsletterInterests, sendMail };
