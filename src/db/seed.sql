-- Seed: Hayfaa Beauty products
INSERT INTO products (slug, name, subtitle, category, price, old_price, description, image, badge, featured, stock) VALUES
('bag-lian', 'شنطة ليان', 'توت يومي من الجلد الطبيعي', 'bags', 320, 400,
 'شنطة توت واسعة من الجلد الطبيعي الناعم، جيبان داخليان وسحّاب مخفي. رفيقتكِ اليومية من الشغل إلى السهرات، بلون بيج دافئ يليق بكل خزانتك.',
 'https://images.pexels.com/photos/29793778/pexels-photo-29793778.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 'الأكثر مبيعاً', true, 15),

('bag-jawhara', 'شنطة جوهرة', 'سكتش مع سلسلة ذهبية', 'bags', 289, NULL,
 'سكتش صغير بقفل ذهبي وسلسلة رفيعة، ينقل إطلالتك من النهار إلى الليل دون تفكير. داخل مبطّن يتسع للهاتف والمحفظة.',
 'https://images.pexels.com/photos/27835299/pexels-photo-27835299.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 NULL, false, 12),

('clutch-lamsa', 'كلش لمسة', 'كلش سهرة مخملي', 'bags', 240, NULL,
 'كلش مخملي بلمعة ساتان خفيفة، صُمم لإطلالات السهرة. يتسع لهاتفكِ ومحفظتكِ وملمّع الشفاه، ويأتي مع حزام كتف اختياري.',
 'https://images.pexels.com/photos/8006405/pexels-photo-8006405.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 'جديد', true, 10),

('bag-nour', 'شنطة نور', 'كروس عملية بسلسلة', 'bags', 260, 310,
 'شنطة كروس بحجم مثالي وحزام قابل للتعديل، خفيفة الوزن وواسعة الاستيعاب. الخيار الذكي ليوم طويل.',
 'https://images.pexels.com/photos/8989582/pexels-photo-8989582.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 NULL, false, 18),

('bag-sara', 'شنطة سارة', 'شنطة يد كلاسيك', 'bags', 350, NULL,
 'شنطة يد كلاسيك بقواعد ذهبية وداخل من الجلد المبطّن — أناقة لا تخرج عن الموضة أبداً.',
 'https://images.pexels.com/photos/20399713/pexels-photo-20399713.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 NULL, false, 8),

('bag-maryam', 'شنطة مريم', 'توت ناعم بلمعة خفيفة', 'bags', 310, NULL,
 'توت ناعم بلمعة خفيفة وخياطة مزدوجة، بلون بيج دافئ. تصميم انسيابي يبقى أنيقاً لسنوات.',
 'https://images.pexels.com/photos/8989866/pexels-photo-8989866.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 'وصل حديثاً', true, 9),

('palette-ghoosoq', 'باليت ظلال غسق', '١٢ درجة هادئة ودافئة', 'makeup', 180, NULL,
 '١٢ درجة ظلال من البيج الدافئ إلى البرونزي العميق، ملمس ناعم جداً وثبات حتى ٨ ساعات. ألوان تُختلط بسهولة لإطلالة يومية أو سهرة.',
 'https://images.pexels.com/photos/32388555/pexels-photo-32388555.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 'الأكثر مبيعاً', true, 25),

('lipstick-warda', 'طقم أحمر شفاه ورد', '٣ درجات وردي هادئة', 'makeup', 150, 190,
 '٣ درجات وردي هادئة بتركيبة مرطبة تدوم، من الورد الفاتح إلى التوت الدافئ. هدية مثالية.',
 'https://images.pexels.com/photos/4110338/pexels-photo-4110338.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 NULL, false, 30),

('palette-dhahab', 'باليت مكياج ذهب', 'مجموعة إطلالة كاملة', 'makeup', 210, NULL,
 'مجموعة إطلالة كاملة: ظلال وبرونزر وأحمر شفاه بدرجات ذهبية دافئة تناسب كل الأوقات وكل درجات البشرة.',
 'https://images.pexels.com/photos/38003888/pexels-photo-38003888.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 'جديد', true, 14),

('lip-ruuby', 'مجموعة شفايف روبي', '٦ درجات مخملية', 'makeup', 260, NULL,
 '٦ أحمر شفاه مخملي بدرجات روبي وتوت، بتركيبة غنية تدوم طوال اليوم دون أن تجفّف الشفاه.',
 'https://images.pexels.com/photos/28968492/pexels-photo-28968492.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 NULL, false, 12),

('brushes-pro', 'طقم فرش برو', '٨ فرش بشعيرات ناعمة', 'makeup', 140, 170,
 '٨ فرش بمقابض خشبية وشعيرات ناعمة جداً، من الفرشاة الكبيرة للبودرة إلى فرشة التفاصيل الدقيقة.',
 'https://images.pexels.com/photos/7256160/pexels-photo-7256160.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 NULL, false, 20),

('makeup-marble', 'مجموعة حجر كريم', 'مكياج ناعم للكل يوم', 'makeup', 195, NULL,
 'مجموعة ناعمة للكل يوم: ظلال هادئة، أحمر خدود، ولمعة شفاه — بإطلالة طبيعية أنيقة تليق بدائرتك القريبة.',
 'https://images.pexels.com/photos/4540077/pexels-photo-4540077.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 'وصل حديثاً', true, 16),

('lip-velvet', 'أحمر شفاه مخملي', 'درجة توت غامقة', 'makeup', 95, NULL,
 'أحمر شفاه بتركيبة مخملية لا تجفّف الشفاه، درجة توت غامقة تليق بالسهرة وبكل إطلالة جريئة.',
 'https://images.pexels.com/photos/11883768/pexels-photo-11883768.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 NULL, false, 40),

('powder-naseem', 'بودرة مخملية نسيم', 'تثبيت ناعم بدون حبيبات', 'makeup', 110, NULL,
 'بودرة حريرية ناعمة بدون حبيبات، توثّق إطلالتك بلمسة نهائية مطفية هادئة تدوم طوال اليوم.',
 'https://images.pexels.com/photos/7290670/pexels-photo-7290670.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 NULL, false, 22)
ON CONFLICT (slug) DO NOTHING;
