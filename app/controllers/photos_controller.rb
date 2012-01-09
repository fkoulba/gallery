class PhotosController < ApplicationController

  def index
    @photos = Photo.all
  end

  def show
    @photo = Photo.find(params[:id])
  end

  def edit
    @photo = Photo.find(params[:id])
  end

  def update
    if params[:photo]
      if @photo.update_attributes(params[:photo])
        redirect_to(@photo)
      else
        render :action => 'edit'
      end
    end
  end

  def new
    @photo = Photo.new
  end

  def create
    @photo = Photo.new
    if params[:photo]
      if @photo.update_attributes(params[:photo])
        redirect_to(@photo)
      else
        render :action => 'new'
      end
    end
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
