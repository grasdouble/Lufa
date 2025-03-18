<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "https://sebastien-lemouillour.fr"
    Header set Access-Control-Allow-Methods "GET, OPTIONS"
    Header set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept"
</IfModule>

<IfModule mod_mime.c>
    AddType application/javascript .mjs
</IfModule>