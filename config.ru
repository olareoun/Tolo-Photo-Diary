require File.join(File.dirname(__FILE__), 'groups/app.rb')
require File.join(File.dirname(__FILE__), 'guides/app.rb')
require File.join(File.dirname(__FILE__), 'auth/app.rb')
require File.join(File.dirname(__FILE__), 'catalog/app.rb')
require File.join(File.dirname(__FILE__), 'images/app.rb')
require File.join(File.dirname(__FILE__), 'web/app.rb')
require File.join(File.dirname(__FILE__), 'fixtures/app.rb')



map "/" do
   run Web
end

map "/groups" do
   run GroupsService
end

map "/guides" do
   run GuidesService
end

map "/auth" do
   run AuthService
end

map "/catalog" do
   run CatalogService
end

map "/test" do
   run Fixtures
end

map "/images" do
   run ImagesService
end