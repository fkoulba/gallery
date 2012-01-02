class PhotosController < ApplicationController

  def index
    @photos = Photo.all
  end

  def show
  end

  def upload
    if request.post?
      params['photos'].each do |photo|
        Photo.upload(photo)
      end
    end
  end

end
