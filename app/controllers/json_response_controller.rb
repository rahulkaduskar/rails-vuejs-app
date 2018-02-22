class JsonResponseController < ApplicationController
  before_action :set_default_response_format
  respond_to :json

  protected

  def set_default_response_format    
    request.format = :json unless request.format.symbol
  end
end
