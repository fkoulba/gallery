class PhotosController < ApplicationController

  def index
    @photos = Photo.all
  end

  def show
  end

  def upload
    if request.post?
      params['images'].each do |image|
        photo = Photo.new(:image => image)
        photo.title = photo.image_file_name
        photo.shot_at = DateTime.now
        photo.save
      end
    end
  end

end
