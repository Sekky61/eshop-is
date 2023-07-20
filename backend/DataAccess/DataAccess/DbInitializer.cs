using DataAccess.Models;
using PasswordHasher;

namespace DataAccess.DataAccess
{
    // Given seed on constructor, generate deterministic GUIDs
    public class GuidGenerator
    {

        public GuidGenerator(int seed)
        {
            this.seed = seed;
            this.rand = new Random(this.seed);
        }

        private int seed;
        private Random rand;

        public Guid GenerateGuid()
        {
            int newRand = this.rand.Next();
            return ToGuid(newRand);
        }

        public static Guid ToGuid(int value)
        {
            byte[] bytes = new byte[16];
            BitConverter.GetBytes(value).CopyTo(bytes, 0);
            return new Guid(bytes);
        }

    }
    public static class DbInitializer
    {
        private static GuidGenerator guidGenerator = new GuidGenerator(55);

        public static void Initialize(EshopDBContext context, PasswordHashingService passwordHasher)
        {
            context.Database.EnsureCreated();

            // Look for any accounts
            if (context.Accounts.Any())
            {
                return;   // DB has been seeded
            }

            var categories = new Category[]
            {
                createCategory("Clothing"),
                createCategory("Electronics"),
                createCategory("Books"),
                createCategory("Toys"),
                createCategory("Food"),
                createCategory("Other"),
            };
            foreach (Category c in categories)
            {
                context.Categories.Add(c);
            }
            context.SaveChanges();

            //define 30 items, divided evenly into every category
            var merch = new Merchandise[] {
                //Clothing
                createMerchandise("T-Shirt", "A T-Shirt", categories[0], 10.99m, 10, new ImageUri[]{new ImageUri("https://zajo.bwcdn.net/media/2022/08/1/8/sk-litio-t-shirt-ss-18105-size-large-v-2.webp")}
),
                createMerchandise("Pants", "A pair of pants", categories[0], 20.99m, 10, new ImageUri[]{new ImageUri("https://img01.ztat.net/article/spp-media-p1/e5445e8ccf1f411aac485027c526a9e5/6d5e6a988b494bcca65a9158416b9f83.jpg?imwidth=156&filter=packshot")}
),
                createMerchandise("Shoes", "A pair of shoes", categories[0], 30.99m, 10, new ImageUri[]{new ImageUri("https://s7d2.scene7.com/is/image/VansEU/VN000D3HY28-HERO?wid=1800&hei=1800")}
),
                createMerchandise("Socks", "A pair of socks", categories[0], 5.99m, 10, new ImageUri[]{new ImageUri("https://www.runsport.cz/userfiles/product/dynafit-no-pain-no-gain-socks-fluo-coral__prd-46069-5.webp")}
),
                createMerchandise("Hat", "A hat", categories[0], 15.99m, 10, new ImageUri[]{new ImageUri("https://files-tonak.s3.eu-central-1.amazonaws.com/products/1231616_Q9040_1_pansky_plsteny_cylindr_cerny.jpg")}
),
                //Electronics
                createMerchandise("Phone", "A phone", categories[1], 100.99m, 10, new ImageUri[]{new ImageUri("https://static.eshop.t-mobile.cz/resize-image?f=cz/sU9zDQ0FsgPfJO9w1LV7W9nkmxZs2P.png&q=70&w=681")}
),
                createMerchandise("Laptop", "A laptop", categories[1], 200.99m, 10, new ImageUri[]{new ImageUri("https://i.pcmag.com/imagery/reviews/02lcg0Rt9G3gSqCpWhFG0o1-2.fit_scale.size_760x427.v1656623239.jpg")}
),
                createMerchandise("Tablet", "A tablet", categories[1], 300.99m, 10, new ImageUri[]{new ImageUri("https://data.planeo.cz/pics/45/45019471/45019471-lim.jpg?1653571120000")}
),
                createMerchandise("Headphones", "A pair of headphones", categories[1], 50.99m, 10, new ImageUri[]{new ImageUri("https://www.energysistem.com/cdnassets/products/45305/principal_2000.jpg")}
),
                createMerchandise("Monitor", "A nice monitor", categories[1], 10.99m, 10, new ImageUri[]{new ImageUri("https://www.lg.com/cz/images/monitory/MD06222176/gallery/M-1.jpg")}
),
                //Books
                createMerchandise("1984", "Realistic book", categories[2], 10.99m, 10, new ImageUri[]{new ImageUri("https://obalky.kosmas.cz/ArticleCovers/142/638_bg.jpg")}
),
                createMerchandise("Harry Potter and the Goblet of fire", "Fantasy book", categories[2], 10.99m, 10, new ImageUri[]{new ImageUri("https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Harry_Potter_and_the_Goblet_of_Fire_cover.png/220px-Harry_Potter_and_the_Goblet_of_Fire_cover.png")}
),
                createMerchandise("Network application and its architecture", "Educational literature", categories[2], 10.99m, 10, new ImageUri[]{new ImageUri("https://www.alescenek.cz/images/zbozi/930/020953-020953-01.jpg")}
),
                createMerchandise("Dune", "Sci-fi", categories[2], 10.99m, 10, new ImageUri[]{new ImageUri("https://www.slovart.cz/buxus/images/cache/eshop_product/image_26102_19_v1.jpeg")}
),
                createMerchandise("50 shades of grey", "Ehhh...really nice book", categories[2], 20.99m, 10, new ImageUri[]{new ImageUri("https://www.knihydobrovsky.cz/thumbs/book-detail-fancy-box/mod_eshop/produkty/f/fifty-shades-of-grey-9780099579939_3.jpg")}
),
                //Toys
                createMerchandise("Teddy Bear", "A toy for little children", categories[3], 30.99m, 10, new ImageUri[]{new ImageUri("https://cdn11.bigcommerce.com/s-ae8a2/images/stencil/80w/products/37/759/Dragonfly_Flowers_Teddy_Bear__99513.1581029420.jpg?c=2")}
),
                createMerchandise("Robot", "A toy for big boys", categories[3], 5.99m, 10, new ImageUri[]{new ImageUri("https://as2.ftcdn.net/v2/jpg/00/06/49/43/1000_F_6494325_aT9BedIxQh3If7zW8nOVEwQqbv5peO75.jpg")}
),
                createMerchandise("Lego set", "Who does not love lego?", categories[3], 15.99m, 10, new ImageUri[]{new ImageUri("https://www.lego.com/cdn/cs/set/assets/blt33e23ec9a964a70d/75968.jpg?format=webply&fit=bounds&quality=75&width=640&height=640&dpr=1")}
),
                createMerchandise("Remote control car", "Wrooom...!", categories[3], 100.99m, 10, new ImageUri[]{new ImageUri("https://5.imimg.com/data5/SELLER/Default/2020/12/VR/KG/TY/117049866/2--500x500.png")}
),
                createMerchandise("Doll", "Something for girls", categories[3], 200.99m, 10, new ImageUri[]{new ImageUri("https://media.4rgos.it/i/Argos/9456590_R_Z001A?w=1000&h=1000&qlt=70&fmt=webp")}
),
                //Food
                createMerchandise("Banana", "Fruit", categories[4], 300.99m, 10, new ImageUri[]{new ImageUri("https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/680px-Banana-Single.jpg?20150318233437")}
),
                createMerchandise("Bread", "Pastry", categories[4], 50.99m, 10, new ImageUri[]{new ImageUri("https://www.seriouseats.com/thmb/4taHPpHcf_4ErzAR9yiup29IOeM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__08__20140810-workhorse-bread-vicky-wasik-3-3a86ee51da2e4a7b8239ceb62d8d8d17.jpg")}
),
                createMerchandise("Bell pepper", "Something for rich people", categories[4], 10.99m, 10, new ImageUri[]{new ImageUri("https://www.chilipeppermadness.com/wp-content/uploads/2019/08/Bell-Peppers-768x1152.jpg")}
),
                createMerchandise("Hamburger", "Yes", categories[4], 10.99m, 10, new ImageUri[]{new ImageUri("https://static.toprecepty.cz/fotky/recepty/0476/klasicky-hamburger-225166-1920-1080-nwo.webp")}
),
                createMerchandise("Food", "Generic item generated by AI", categories[4], 10.99m, 10, new ImageUri[]{new ImageUri("https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg")}
),
                //Other
                createMerchandise("Bowl", "Quite important item", categories[5], 10.99m, 10, new ImageUri[]{new ImageUri("https://www.ikea.com/cz/en/images/products/blanda-matt-serving-bowl-bamboo__0711988_pe728640_s5.jpg?f=xl")}
),
                createMerchandise("Car", "Nice ride, man", categories[5], 10.99m, 10, new ImageUri[]{new ImageUri("https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1666008987698.jpg?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=10&w=800")}
),
                createMerchandise("House", "Just get a house", categories[5], 20.99m, 10, new ImageUri[]{new ImageUri("https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg")}
),
                createMerchandise("Spaceship", "Fly me to the moon", categories[5], 30.99m, 10, new ImageUri[]{new ImageUri("https://images.pexels.com/photos/355906/pexels-photo-355906.jpeg?auto=compress&cs=tinysrgb&w=400")}
),
                createMerchandise("Moon", "That's one small step for man, one giant leap for mankind.", categories[5], 5.99m, 10, new ImageUri[]{new ImageUri("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/220px-FullMoon2010.jpg")}
),
            };
            foreach (Merchandise m in merch)
            {
                context.Merchandises.Add(m);
            }
            context.SaveChanges();

            // Create orders, baskets and payment info as well
            var customers = new List<Customer>();

            Address c1_address = new Address { Street = "123 Main St", City = "Seattle", State = "WA", PostalCode = "98101" };
            CreditCard c1_card = new CreditCard { CardHolderName = "John Doe", CardNumber = "1234567890123456", ExpirationDate = "09/27", Ccv = "123" };
            List<Order> c1_orders = new List<Order> {
                new Order(new List<OrderItem> {
                        new OrderItem { Item = merch[0], Quantity = 1, Price = merch[0].Price },
                    }) {
                    Address = c1_address,
                    CreatedTime = DateTime.Now.AddDays(-5),
                    PaymentInformation = c1_card,
                    Status = OrderStatus.Delivered
                },
                new Order(new List<OrderItem> {
                        new OrderItem { Item = merch[0], Quantity = 1, Price = merch[0].Price },
                    }) {
                    Address = c1_address,
                    CreatedTime = DateTime.Now.AddHours(-4),
                    PaymentInformation = c1_card,
                    Status = OrderStatus.Pending
                }
            };
            Basket c1_basket = new Basket
            {
                BasketItems = new List<BasketItem> {
                    new BasketItem { Item = merch[1], Quantity = 2 },
                    new BasketItem { Item = merch[2], Quantity = 1 }
                }
            };
            customers.Add(createCustomer("customer1@gmail.com", "customer1", "John", "Doe", "206-555-1212", c1_address, c1_card, c1_orders, c1_basket, passwordHasher));

            Address c2_address = new Address { Street = "Rubikova 12", City = "Praha", State = "CZ", PostalCode = "12000" };
            CreditCard c2_card = new CreditCard { CardHolderName = "Jane Doe", CardNumber = "1234567890123456", ExpirationDate = "09/27", Ccv = "123" };
            List<Order> c2_orders = new List<Order> { };
            Basket c2_basket = new Basket();
            customers.Add(createCustomer("customer2@gmail.com", "customer2", "Jane", "Doe", "+420 712 112 788", c2_address, c2_card, c2_orders, c2_basket, passwordHasher));

            Address c3_address = new Address { Street = "789 Main St", City = "New York", State = "NY", PostalCode = "98101" };
            CreditCard c3_card = new CreditCard { CardHolderName = "John Smith", CardNumber = "894555123111", ExpirationDate = "01/27", Ccv = "123" };
            Basket c3_basket = new Basket();
            List<Order> c3_orders = new List<Order> {
                new Order{
                    Items = new List<OrderItem> {
                        new OrderItem { Item = merch[9], Quantity = 1, Price = merch[9].Price }
                    },
                    Address = c1_address,
                    CreatedTime = DateTime.Now.AddHours(-8),
                    PaymentInformation = c1_card,
                    Status = OrderStatus.Delivered
                }
             };
            customers.Add(createCustomer("customer3@gmail.com", "customer3", "Jake", "Smith", "269-555-7841", c2_address, c2_card, c2_orders, c3_basket, passwordHasher));

            foreach (Customer c in customers)
            {
                context.Accounts.Add(c);
            }
            context.SaveChanges();

            var admins = new Admin[]
            {
                createAdmin("admin1@gmail.com", "admin1", passwordHasher),
                createAdmin("admin2@gmail.com", "admin2", passwordHasher),
                createAdmin("admin3@gmail.com", "admin3", passwordHasher),
            };
            foreach (Admin a in admins)
            {
                context.Accounts.Add(a);
            }
            context.SaveChanges();

            var managers = new Manager[]
            {
                createManager("manager1@gmail.com", "manager1", passwordHasher),
                createManager("manager2@gmail.com", "manager2", passwordHasher),
                createManager("manager3@gmail.com", "manager3", passwordHasher),
            };

            foreach (Manager m in managers)
            {
                context.Accounts.Add(m);
            }
            context.SaveChanges();
        }


        static Customer createCustomer(
            string email,
            string password,
            string firstName,
            string lastName,
            string phoneNumber,
            Address address,
            CreditCard card,
            List<Order> orders,
            Basket basket,
            PasswordHashingService passwordHasher)
        {
            return new Customer
            {
                Id = guidGenerator.GenerateGuid(),
                Email = email,
                PasswordHash = passwordHasher.HashPassword(password),
                FirstName = firstName,
                LastName = lastName,
                Address = address,
                PhoneNumber = phoneNumber,
                PaymentInformation = card,
                Orders = orders,
                Basket = basket
            };
        }

        static Admin createAdmin(string email, string password, PasswordHashingService passwordHasher)
        {
            return new Admin
            {
                Id = guidGenerator.GenerateGuid(),
                Email = email,
                PasswordHash = passwordHasher.HashPassword(password),
            };
        }

        static Manager createManager(string email, string password, PasswordHashingService passwordHasher)
        {
            return new Manager
            {
                Id = guidGenerator.GenerateGuid(),
                Email = email,
                PasswordHash = passwordHasher.HashPassword(password),
            };
        }

        static Category createCategory(string name)
        {
            return new Category
            {
                Id = guidGenerator.GenerateGuid(),
                Name = name
            };
        }

        static Merchandise createMerchandise(string name, string description, Category category, decimal price, int inStockCount, ImageUri[] images)
        {
            return new Merchandise
            {
                Id = guidGenerator.GenerateGuid(),
                Name = name,
                Description = description,
                Category = category,
                Price = price,
                InStockCount = inStockCount,
                Images = images,
                CurrentlyWatching = 0,
            };
        }

        static Order createOrder(Customer customer, OrderItem[] merchandises, OrderStatus status)
        {

            DateTime created = DateTime.Now.AddDays(-1);

            CreditCard? cc = customer.PaymentInformation;

            if (cc == null)
            {
                cc = new CreditCard
                {
                    Id = guidGenerator.GenerateGuid(),
                    CardNumber = "1234567890123456",
                    ExpirationDate = "12/2020",
                    Ccv = "123",
                    CardHolderName = customer.GetFullName(),
                };
            }

            return new Order(merchandises)
            {
                Id = guidGenerator.GenerateGuid(),
                Customer = customer,
                Status = status,
                CreatedTime = created,
                PaymentInformation = cc,
                Address = customer.Address,
            };
        }
    }
}