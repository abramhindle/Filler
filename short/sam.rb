#!/usr/bin/env ruby

source = $<.read

def print_table(table)
  keys = table.keys.sort_by { |k| table[k] * k.length }.reverse
  max_key_length = keys.sort_by { |k| k.length }.last.length
  keys.each do |key|
    puts "%-#{max_key_length+10}s  %3d occurrences     %3d bytes" % [key.inspect, table[key], table[key] * key.length]
  end
end

def find_repeated_substrings(source)
  results = {}
  2.upto(source.length / 2) do |size|
    0.upto(source.length - size) do |offset|
      substring = source[offset, size]
      matches = source.scan(substring).length
      results[substring] = matches if matches > 1
    end
  end
  results
end

print_table(find_repeated_substrings(source))

