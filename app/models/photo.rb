class Photo

  def self.web_path
    'photos'
  end

  def self.scan
    Dir.glob(File.join(Rails.root, 'public', self.web_path, '*.{jpg,JPG}'))
  end

  def self.upload(upload)
    name = File.basename(upload.original_filename)
    path = File.join(Rails.root, 'public', self.web_path, name)
    File.open(path, "wb") { |f| f.write(upload.read) }
  end

end
