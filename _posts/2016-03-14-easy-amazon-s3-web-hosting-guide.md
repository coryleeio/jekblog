---
description: Hosting static sites cheaply with AWS S3
is_post: true
---

I'm going to show how I host this very site for < $0.50 USD a month using AWS.  Specifically I will walk through how to host a static website on AWS utilizing S3 and Route 53.

### Foreword

There are many sites that offer automagical non-technical hosting for your website.
At the time of this writing, most of those will cost you at least $5-9/mo or more.

In this article I would like to show that hosting your own site really isn't that hard, and that you can save a couple dollars per site if you host them yourself instead.
<br /> <br /> 
The process consists of four parts:

* [Creating an S3 bucket](#creating-an-s3-bucket)

* [Configure your bucket to be publically accessible, and to serve your site](#configure-your-s3-bucket-to-serve-your-site)

* [Upload the site](#uploading-our-site-to-s3)

* [Create a DNS record for the bucket](#creating-a-dns-record)


Prerequisites: A domain purchased from a domain provider such as godaddy.  In my case this was corylee.io, purchased from https://www.nic.io.  

You can do this tutorial without a domain, but you will have an ugly url, such as: corylee.io.s3-website-us-east-1.amazonaws.com

**Warning**: Serving a website from S3 is not free, the price is typically very low, but you will want to make sure you are ok with receiving a bill from AWS before continuing. 

[Pricing information can be found here](https://aws.amazon.com/s3/pricing/)
<br /> <br /><br /> 

### Creating an S3 Bucket
This particular solution focuses on AWS S3.  If you dont have an AWS account you'll need to [make one](https://aws.amazon.com/), or log in.  <br /> <br />

Under 'Storage and Content Delivery' Click on S3.  You should see something like the following:
![S3 interface](/images/s3hosting1-2.jpg)<br /> <br />

Press create bucket, set the bucket name to the hostname you purchased from the domain provider.  I used 'corylee.io'.   

**Warning**: Later in section four you will not be able to create a DNS entry if you did not set your bucket to the same name as your site, so choose carefully.  

If you dont have a domain purchased, just name it something unique(All s3 buckets share the same namespace, and yours must be unique to proceed).  

As for the region, just choose something near where you live.  I chose 'US Standard'.   Press create.

![S3 interface](/images/s3hosting1-3.jpg)<br /> <br /><br /><br /> 





You should now see your bucket in the list.

Click on your bucket, and then click on the properties button at the top right:

![S3 interface](/images/s3hosting1-4.jpg)
<br /><br /> <br /><br /> 

### Configure your S3 bucket to serve your site

Expand the permissions drop down and click on 'Add bucket policy'
![S3 interface](/images/s3hosting1-5.jpg)<br /> <br />

<br /><br /> <br /><br /> 

**Warning**: This bucket security policy makes the contents of your bucket accessible to the public, so make sure that you dont have anything in this bucket you dont want to share before proceeding.
  

	{
	  "Version":"2008-10-17",
	  "Statement":[{
	    "Sid":"AllowPublicRead",
	        "Effect":"Allow",
	      "Principal": {
	            "AWS": "*"
	         },
	      "Action":["s3:GetObject"],
	      "Resource":["arn:aws:s3:::corylee.io/*"
	      ]
	    }
	  ]
	}

<br /> <br />

Paste this into the box and hit save. 
![S3 interface](/images/s3hosting1-6.jpg)

<br /> <br /> <br /><br /> 


Next click on 'Static website hosting' and mark the 'Enable website hosting' option.
Type 'index.html' into the index document field, this will be the first document that get served at the root of our URL.  

For example typing corylee.io into the browser, will show the contents of my index.html page.
Now press save.

This will make it so that your website can be served from S3
![S3 interface](/images/s3hosting1-7.jpg)

Put the endpoint(highlighted in blue) at the top of the static website hosting in a notepad, we will need it momentarily to test our site.

At this point anything we upload into our bucket can be accessed by other people on the web.  Next we will upload our site to S3, and finally setup DNS via Route 53, so that you can access the site via a pretty URL like http://corylee.io
<br /> <br /> <br /><br /> 

### Uploading our site to S3
To upload our static site to S3, simply grab your folder full of HTML, CSS and Javascript, and upload it into S3 by clicking on the big blue 'upload' button.
![S3 interface](/images/s3hosting1-8.jpg)


Now simply dragging the folder containing your index.html, CSS and javascript over the 'Drag and Drop' section and press 'Start upload'

![S3 interface](/images/s3hosting1-9.jpg)
<br /> <br /><br /> <br />

Once we are done uploading you should be able to navigate to your 'endpoint' that we acquired in the last section pasting it into a browser.  This is also publically accessible, so you can link others to this document as well.



![S3 interface](/images/s3hosting1-10.jpg)
<br /> <br /> <br /><br /> 


### Creating a DNS record
Navigate up to the services tab at the top left of the screen, and locate 'Route 53'

On the left side of the screen click 'Hosted Zones', and then click the 'Create Hosted Zone' blue button in the center of the screen.  You should see something like the following:

Fill out the domain name with the domain name you purchased at your registrar, in my case, 'corylee.io' and press create

![S3 interface](/images/s3hosting1-11.jpg)
<br /> <br />



This will create a couple of DNS records for your site, next press 'Create Record Set' to create a new DNS entry.  The name should be blank(as corylee.io is appended in this case), and the type should be 'A-IPv4 Address'.  Click on the 'Yes' option under alias, and for the Alias target, paste in the 'endpoint' from part 3 that we used to access our site.

![S3 interface](/images/s3hosting1-12.jpg)
<br /> <br /><br /> <br />

Next take note of the records that Route 53 created for us in the NS field, it looks like the following:
![S3 interface](/images/s3hosting1-13.jpg)
<br /> <br /> <br /><br /> 

At this point everything is setup properly, but one problem remains. 

Amazon is not yet marked as the authority that we use to resolve DNS records for your domain.

Meaning that, when a computer looks for corylee.io, It is still going to ask the domain registrar where to find it.  We want it to ask Amazon instead.  To fix this, we will need to take the NS records, and set them as the NS records for our domain via our registrar.  We do this by going to our domain registrar's site. 

<br /><br />  

I recommend doing a quick google for your domain provider such as 
'[godaddy change nameservers for domain](http://lmgtfy.com/?q=godaddy+change+nameservers+for+domain)' or whichever domain registrar you chose to use.

Follow the provider-specific instructions and replace the domain registrar's NS records with the NS records we extracted above from Amazon. This will make Amazon Route 53 become the authority on where to find your site. This typically takes only a minute or less, once you find the right page on the site.

And there you have it, you should now be able to navigate to your site in the browser, and you should see your index.html:

![S3 interface](/images/s3hosting1-14.jpg)


If you have any questions,comments, or concerns, don't hesitate to reach out or leave a comment below. 

Thanks for reading. :)


















