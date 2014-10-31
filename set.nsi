Name "SET"
OutFile "set.exe"
SilentInstall silent
Icon "set.ico"
InstallDir "$TEMP\SET"
RequestExecutionLevel user

Section
SetOutPath "$INSTDIR"
File "*.ico"
File "*.png"
File "*.html"
File "*.js"
ExecShell 'open' '"$TEMP\SET\index.html"'
SectionEnd
