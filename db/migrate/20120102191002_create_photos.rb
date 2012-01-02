class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :title
      t.datetime :shot_at
      t.timestamps
    end
    add_index :photos, :shot_at
  end
end
