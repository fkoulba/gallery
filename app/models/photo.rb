class Photo

  def self.web_path
    '/photos'
  end

  def self.root_path
    File.join(Rails.root, 'public', self.web_path)
  end

  def self.scan
    Dir.glob(File.join(self.root_path, '*.{jpg,JPG}')).collect do |filename|
      self.init_with_filename(File.basename(filename))
    end
  end

  def self.init_with_filename(filename)
    photo = self.new
    photo.filename = filename
    photo
  end

  def self.upload(upload)
    name = File.basename(upload.original_filename)
    path = File.join(self.root_path, name)
    File.open(path, "wb") { |f| f.write(upload.read) }
  end

  attr_accessor :filename

  def web_path
    File.join(self.class.web_path, filename)
  end

  def root_path
    File.join(self.class.root_path, filename)
  end

end
