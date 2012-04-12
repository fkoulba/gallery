class PhotosController < ApplicationController

  def index
    @photos = Photo.all
  end

  def show
    @photo = Photo.find(params[:id])
  end

  def edit
    @photo = Photo.find(params[:id])
    if request.xhr?
      render :partial => 'form'
    end
  end

  def update
    @photo = Photo.find(params[:id])
    if params[:photo]
      if @photo.update_attributes(params[:photo])
        if request.xhr?
          render :partial => 'editable_attr', :locals => { :attr_name => params[:photo].keys.first, :attr_value => params[:photo].values.first }
        else
          redirect_to(@photo)
        end
      else
        if request.xhr?
          render :partial => 'form'
        else
          render 'edit'
        end
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
        photo.title = photo.image.identifier
        photo.shot_at = DateTime.now
        photo.save
      end
    end
  end

end
