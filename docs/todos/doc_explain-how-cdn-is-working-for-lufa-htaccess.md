<IfModule mod_headers.c>

    SetEnvIf Origin "^https://www\.sebastien-lemouillour\.fr$" is_allowed_origin=$0
    SetEnvIf Origin "^https://sebastien-lemouillour\.fr$" is_allowed_origin=$0

    Header always set Access-Control-Allow-Origin "%{is_allowed_origin}e" env=is_allowed_origin
    Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS" env=is_allowed_origin
    Header always set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept" env=is_allowed_origin
    Header always set Access-Control-Allow-Credentials "true" env=is_allowed_origin

</IfModule>

<IfModule mod_mime.c>
    AddType application/javascript .mjs
    AddType application/json .map
    AddType text/css .css
</IfModule>
