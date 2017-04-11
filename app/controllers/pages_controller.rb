class PagesController < ApplicationController
  def one
  end

  def two
  end

  def three
    sleep 1
    render json: { foo: 'bar' }
  end
end
