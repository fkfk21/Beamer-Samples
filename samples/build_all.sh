#! /bin/bash

find . -maxdepth 2 -type f -name "main.tex" | while read -r tex_file; do
  theme_name=$(dirname $tex_file)
  echo "Start building: $theme_name"
  cd $theme_name
  latexmk -pdfdvi -synctex=1 -file-line-error -silent -outdir=out main.tex

  cd - > /dev/null
done
