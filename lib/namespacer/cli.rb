require 'thor'

module Namespacer

  # Facade for Namespacer command line interface managed by [Thor](https://github.com/wycats/thor).
  # This is the main interface to Namespacer that is called by the Namespacer binary `bin/Namespacer`.
  # Do not put any logic in here, create a class and delegate instead.
  class CLI < Thor

    require 'namespacer'
    require 'namespacer/version'

    desc 'prefix', 'Attaches prefix to images found, replacing references in text files'
    method_option :prefix,
                  :type => :string,
                  :aliases => '-p',
                  :banner => 'filename prefix',
                  :required => true

    method_option :alt_prefix,
                  :type => :string,
                  :aliases => '-a',
                  :banner => 'alternate filename prefix for images referenced in text files but not found in path',
                  :required => false

    def prefix

      Namespacer.prefix(options[:prefix], options[:alt_prefix])

    end


    desc 'version', 'Show the Guard version'
    map %w(-v --version) => :version

    # Shows the current version of Namespacer.
    #
    # @see Namespacer::VERSION
    #
    def version
      puts "Namespacer version #{ ::Namespacer::VERSION }"
    end

    private

    def method_missing(meth, *args)
      help
    end
  end

end