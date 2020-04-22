s3cmd -c ./s3cfg modify --add-header=x-amz-meta-foo:Bar s3://components/1.4.0/stats.html
s3cmd -c ./s3cfg modify --remove-header=x-amz-meta-customfield s3://components/1.4.0/stats.html
s3cmd -c ./s3cfg info s3://components/1.4.0/stats.html
#s3cmd -c ./s3cfg del -r s3://components/1.4.0
#s3cmd -c ./s3cfg ls -r s3://components/
#s3cmd -c ./s3cfg sync --acl-public --exclude='*' --include='*.js' --mime-type="application/javascript" cdn/1.4.0 s3://components
#s3cmd -c ./s3cfg sync --acl-public --exclude='*' --include='*.svg' --mime-type="image/svg+xml" cdn/1.4.0 s3://components
