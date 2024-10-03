class Word < ApplicationRecord
  validates_presence_of :word
  normalizes :word, with: -> word { word.downcase.strip }
end