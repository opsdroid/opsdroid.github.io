 ![opsdroid](https://github.com/opsdroid/style-guidelines/raw/master/logos/logo-wide-light.png)


This is a Jekyll website which acts as the central landing page for the [opsdroid](https://opsdroid.github.io) project.

The basic idea of the page is to provide a single place where users can easily navigate to anywhere in the opsdroid ecosystem.
To keep maintenance to a minimum this page should leverage third-party APIs to gather content dynamically. For example, pulling
module lists from the GitHub API, or blog posts from Medium.

## Installation

To contribute to the [opsdroid](https://opsdroid.github.io) website, first, you need to have Jekyll installed in your machine. Jekyll is a Ruby Gem and can be installed on most systems.

*Requirements:*

- Ruby (version 2.2.5+)
- RubyGems
- GCC and Make

If you need help installing Ruby on your machine, check the official [Jekyll page](https://jekyllrb.com/docs/installation/).

Once you have Ruby and all the other dependencies installed, you can run the following command from your command line to install the Jekyll Gem.

```ruby
gem install bundler jekyll
```

## Quick start

To contribute to the site, you need to fork this repository, then clone it into your machine by running the command:

```shell
git clone https://github.com/<Your Username>/opsdroid.github.io.git
```

Then just go into the newly created folder by running:

```shell
cd opsdroid.github.io
```

Once you have the Jekyll Gem installed on your machine you can start your own version of the site by running the following command from your command line.

```shell
jekyll serve
```

Now you can just head over to `http://localhost:4000` and see your live version of the website.

## Contributing

Contributing to the opsdroid ecosystem is strongly encouraged and every little bit counts! We even send [sticker packs](https://medium.com/opsdroid/contributor-sticker-packs-738058ceda59) to our contributors to say thank you! 

Do you need help? Do you want to chat? [Join our Matrix channel](https://app.element.io/#/room/#opsdroid-general:matrix.org)