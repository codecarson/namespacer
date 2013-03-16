#!/usr/bin/env ruby

require 'yaml'

########################################################
#
# Namespaces images and replaces references where found.
# It won't namespace images not found in the path, so if you're referencing
# images outside of the main folder keep that in mind.
#
# Note: take a long time processing minified files!
#
# first argument is the prefix to use

# parse arguments

prefix = ""
suffix = ""

# GLOB pattern for files to process - cannot pass this pattern as an argument - doesn't work!
files_to_process = "**/*.{html,sass,css}"

# grab the prefix
prefix = ARGV.first || ""
alt_prefix = ARGV[1] || ""   # alternate prefixing for images not found in path


#####
#
# Glob all images in path and subfolders.  We'll search for these images
# inside the HTML file and if found, prefix them.
#
original_images = Dir.glob('**/*.{jpg,png,gif}')

# strip path from the match pattern
original_images = original_images.map do |img|
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
    puts "-- replacing #{match} --> #{replacement_hash[match]}"
    replacement_hash[match]
  end

  # TODO: add an option to accept an argument to namespace files not found inside
  # path (e.g. referenced outside main folder)

  puts 'Other images referenced:'
  replacement = replacement.gsub(/(?<!\\\/)([^\\\/]+)(gif|jpg|png)/) do |match|
    new_string = match

    puts "-- #{match}"

    unless alt_prefix.empty?
      unless match =~ Regexp.new("#{prefix}|#{alt_prefix}")
        puts "-- #{match} --> #{alt_prefix}-#{match}"
        new_string = "#{alt_prefix}-#{match}"
      end
    end

    new_string
  end


  # write to file
  File.open(input_file, "w") { |file| file.puts replacement }
end

