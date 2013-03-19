require "namespacer/version"
require 'yaml'

module Namespacer

  def self.prefix(prefix = "", alt_prefix = "")
    ########################################################
    #
    # Namespaces images and replaces references where found.
    # It won't namespace images not found in the path, so if you're referencing
    # images outside of the main folder keep that in mind.
    #
    # Note: takes a long time processing minified files!
    #
    # first argument is the prefix to use
    # second argument is the alternate prefix to use


    # GLOB pattern for files to process - cannot pass this pattern as an argument - doesn't work!
    files_to_process = "**/*.{html,sass,css,js}"

    #####
    #
    # Glob all images in path and subfolders.  We'll search for these images
    # inside the HTML file and if found, prefix them.
    #
    original_images_with_path = Dir.glob('**/*.{jpg,png,gif}')

    # strip path from the match pattern
    original_images = original_images_with_path.map do |img|
      puts File.basename(img)
      File.basename(img)
    end

    # form a regex match pattern of all of the images, ensuring it's not already namespaced
    images_match_pattern = Regexp.union(original_images.map { |img| /(?<!#{prefix})#{img}/ })



    #####
    #
    # Create the replacement hash but prefixing filename
    #
    replacement_hash = original_images.inject({}) do |m,e|
      m[e] = e.gsub(e, File.basename(prefix + e))
      m
    end

    puts "Replacement Hash: "
    puts replacement_hash.to_yaml

    namespaced = original_images.map { |old_name| prefix + old_name }
    puts "\n\rOriginal images: #{Regexp.union(namespaced)}"



    ######################################################################
    #
    # Loop through each file and replace the original image name with the
    # namespaced one.
    #
    puts "\n\rImage match pattern: #{images_match_pattern}"
    puts "------------------------------------------------------------------"

    Dir.glob(files_to_process).each do |input_file|
      puts "\n\rWorking on: #{input_file}"

      file_content = File.read(input_file)
      replacement = file_content.gsub(images_match_pattern) do |match|
        new_string = match

        if Regexp.new("^#{prefix}") =~ match
          puts "Ignoring: #{match} - already namespaced"
        else
          puts "-- replacing #{match} --> #{replacement_hash[match]}"
          new_string = replacement_hash[match]
        end

        new_string
      end

      # TODO: add an option to accept an argument to namespace files not found inside
      # path (e.g. referenced outside main folder)

      puts 'Other images referenced:'
      replacement = replacement.gsub(/(?<!\\\/)([^\\\/]+)(gif|jpg|png)/) do |match|
        new_string = match

        # ignore match if it has one of our prefixes
        prefixes = [prefix, alt_prefix].reject {|x| x.nil? || x.empty?} .join('|')
        unless match =~ Regexp.new("^#{prefixes}")
          if alt_prefix && !alt_prefix.empty?
            puts "-- #{match} --> #{alt_prefix}-#{match}"
            new_string = "#{alt_prefix}-#{match}"
          end
          puts "-- #{match}"
        end

        new_string
      end


      # write to file
      File.open(input_file, "w") { |file| file.puts replacement }
    end


    ######################################################################
    #
    # Rename files
    #
    original_images_with_path.each do |old_file|
      basename = File.basename(old_file)
      new_file = old_file.gsub(basename, replacement_hash[basename])

      puts "Renaming #{old_file} -> #{new_file}"
      File.rename(old_file, new_file) unless old_file.include?(prefix)
    end

  end

end