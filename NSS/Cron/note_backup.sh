#!/bin/bash
# Simple script to backup and file. Very inefficient. Made with crontab -e, so the ~/ will point to my home directory.

# declare the date (to be used in the filename)
date=$(date +%Y%m)
# set a success message
printf -v success "%s\tBackup succesful." $date

# copy the contents of the file
cat ~/desktop/quick_notes.txt >> ~/archive/documents/combined_notes--master.txt

# move the file
mv ~/desktop/quick_notes.txt ~/documents/notes/combined_notes--$date.txt

# create a blank note file to replaced the backed-up file
touch ~/desktop/quick_notes.txt

# keep record of backups (in user's home directory).
echo "$success" >> ~/note_backup.log
