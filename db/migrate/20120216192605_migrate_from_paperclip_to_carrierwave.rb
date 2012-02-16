class MigrateFromPaperclipToCarrierwave < ActiveRecord::Migration
  def up
  	add_column :photos, :image, :string
  	Photo.all.each do |photo|
  		photo.image = photo.image_file_name
  		photo.save
  	end
  	remove_column :photos, :image_file_name
  	remove_column :photos, :image_content_type
  	remove_column :photos, :image_file_size
  	remove_column :photos, :image_updated_at
  end

  def down
  	add_column :photos, :image_file_name, :string
  	add_column :photos, :image_content_type, :string
  	add_column :photos, :image_file_size, :string
  	add_column :photos, :image_updated_at, :datetime
  	Photo.all.each do |photo|
  		photo.image_file_name = photo.image
  		photo.save
  	end
  	remove_column :photos, :image
  end
end
