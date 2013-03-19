# Namespacer

I built this gem to ease the pain of transitioning a project to Scene7, which requires unique image filenames.

Namespacer will search the path for all JPG, PNG and GIF images.  Images that are found are renamed with a given prefix.  Any reference to these images in JS, HTML, SASS, and CSS file will be updated accordingly.

There may be instances where an image is referenced but not found in path (e.g. referencing images outside path in a common folder).  You can optionally specific an alternate prefix for these images.  For example, I might prefix images found in path with "project-year-subfolder-" and alternate prefix other images "project-year-common-".

If you are using Scene7, check out [Scene7ize](https://github.com/codecarson/scene7ize).

## Installation

Add this line to your application's Gemfile:

    gem 'namespacer'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install namespacer

## Usage

Main usage:
`namespacer prefix -p my-prefix-`

With an alternate prefix:
`namespacer prefix -p my-prefix- -a my-alt-prefix-`

If you ran this command in this folder:
- index.html
- sass/page.sass
- css/page.css
- images/dancing-happy-face.gif
- images/logo.png

The images would be renamed:
- images/my-prefix-dancing-happy-face.gif
- images/my-prefix-logo.png

And any references to them in index.html, page.sass and page.css would be updated.

## TODO

- Add options for file filters, include and exclude file types.
- Add option to run in safe mode that will display what actions would be done without doing them.
- Refactor the code. I did the bare minimum to make it a gem.
- Write some tests.  I know, I know.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
