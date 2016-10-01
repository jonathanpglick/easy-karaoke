npm run build-prod
rsync --human-readable --progress --archive --backup --compress --rsh "ssh" dist/ jonglick.com:~/karaoke.jonglick.com/
rm -r dist
