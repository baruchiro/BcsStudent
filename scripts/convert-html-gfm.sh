# Move this file to the root folder, then run it with the path of the markdown file
source=$1

gfm=$(cat $source | sed -n '/---/,/---/!p' | pandoc -t gfm -f html)

frontmatter=$(sed -n '/---/,/---/p' $source)

echo "$frontmatter" > $source
echo "$gfm" >> $source

