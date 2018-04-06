tar -zcvf bundle.tar.gz ./dist
scp ./bundle.tar.gz tokeny@dev.tokeny.com:/home/tokeny/tokeny.prod/
ssh tokeny@dev.tokeny.com '/home/tokeny/tokeny.prod/admin_deploy.sh'