class WordsController < ApplicationController
  def index
    @words = Word.all
  end
  def show
    @word = Word.find_by_word(params[:word].downcase)
  end
end