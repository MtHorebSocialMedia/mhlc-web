#!/bin/bash

# Mogrify docs and options can be found here:
# https://imagemagick.org/script/mogrify.php

# Set the desired size
SIZES=(400 500 600 800)

# Find all .jpg and .png images in the current directory
for FILE in library/*.jpg #library/*.png
do
  for SIZE in ${SIZES[@]}
  do
    DESTJPG="${FILE/library/library\/$SIZE}"
    DESTPNG="${DESTJPG/jpg/png}"
    mkdir -p "library/$SIZE"

    # Resize original image if larger than desired and fix orientation
    if [ $(identify -format "%[fx:w]" $FILE) -gt $SIZE ]; then
        # Resize the image
        mogrify -auto-orient -resize $SIZE -write $DESTJPG $FILE
        mogrify -auto-orient -resize $SIZE -write $DESTPNG $FILE
    else
        mogrify -auto-orient -write $DESTJPG $FILE
        mogrify -auto-orient -write $DESTPNG $FILE
    fi

    # Optimize no border
    mogrify \
        -strip \
        -interlace Plane \
        -quality 85% \
        $DESTJPG
    mogrify \
        -strip \
        -interlace Plane \
        -quality 85% \
        $DESTPNG

    # Optimize with border
    mogrify \
        -shave 1x1 \
        -bordercolor black \
        -border 1 \
        -strip \
        -interlace Plane \
        -quality 85% \
        -write "${DESTJPG/.jpg/-border.jpg}" \
        $DESTJPG
    mogrify \
        -shave 1x1 \
        -bordercolor black \
        -border 1 \
        -strip \
        -interlace Plane \
        -quality 85% \
        -write "${DESTPNG/.png/-border.png}" \
        $DESTPNG

    # Rounded corners with border (png only)
    convert $DESTPNG \
        -format 'roundrectangle 1,1 %[fx:w+4],%[fx:h+4] 25,25' \
        info: > rounded_corner.mvg
    convert $DESTPNG \
        -border 3 \
        -alpha transparent \
        -background none \
        -fill white \
        -stroke none \
        -strokewidth 0 \
        -draw "@rounded_corner.mvg" \
        rounded_corner_mask.png
    convert $DESTPNG \
        -border 3 \
        -alpha transparent \
        -background none \
        -fill none \
        -stroke white \
        -strokewidth 3 \
        -draw "@rounded_corner.mvg" \
        rounded_corner_overlay.png
    convert $DESTPNG \
        -alpha set \
        -bordercolor none \
        -border 3 \
        rounded_corner_mask.png -compose DstIn -composite \
        rounded_corner_overlay.png -compose Over -composite \
        "${DESTPNG/.png/-border-rounded.png}"
    rm rounded_corner_mask.png
    rm rounded_corner_overlay.png

    echo "Generated optimized options for: $FILE"

  done
done