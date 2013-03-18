# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'namespacer/version'

Gem::Specification.new do |gem|
  gem.name          = "namespacer"
  gem.version       = Namespacer::VERSION
  gem.authors       = ["Brad Carson"]
  gem.email         = ["brad@pixelwavedesign.com"]
  gem.description   = %q{...}
  gem.summary       = %q{Prefixes images with a given string, renaming files and replacing references in text files}
  gem.homepage      = "https://github.com/codecarson/namespacer"

  gem.files         = `git ls-files`.split($/)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]

  gem.add_development_dependency 'rake'
  gem.add_development_dependency 'rspec'

  gem.add_dependency 'thor'
  gem.add_dependency 'mini_magick'

end
