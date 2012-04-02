class AddImageWidthAndImageHeightToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :image_width, :integer
    add_column :photos, :image_height, :integer
  end
end
