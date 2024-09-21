// Docs for mailchimp marketing api:
// https://mailchimp.com/developer/marketing/api/

// require('dotenv').config();

const mailchimp = require('@mailchimp/mailchimp_marketing');

function getMailchimpClient() {
    mailchimp.setConfig({
        apiKey: process.env.MAILCHIMP_API_KEY,
        server: process.env.MAILCHIMP_SERVER_PREFIX,
    });
    return mailchimp;
}

// https://mailchimp.com/developer/marketing/api/list-members/
async function addMemberToNewsletter(request) {
    const client = getMailchimpClient();
    const { id: listId } = await getNewsletterList(client);
    // const response = await client.lists.addListMember(listId, {
    //     email_address: request.emailAddress,
    //     status: "pending",
    //     merge_fields: {
    //         "FNAME": request.firstName,
    //         "LNAME": request.lastName,
    //     }
    // });
    return true;
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
    console.log(response);
}

// getNewsletterInterests();

module.exports = { addMemberToNewsletter, getNewsletterInterests };

