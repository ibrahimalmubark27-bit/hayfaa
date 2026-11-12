-- Seed: Hayfaa Beauty shoes
INSERT INTO products (slug, name, subtitle, category, price, old_price, description, image, badge, featured, stock) VALUES
('heel-dana', 'كعب دانة', 'كعب نود أنيق للسهرة', 'shoes', 340, 420,
 'كعب نود بدرجات الجلد الدافئة، ارتفاع مريح 7سم ونعل مبطّن. القطعة اللي تكمل أي فستان وأي إطلالة عمل.',
 'https://images.pexels.com/photos/29393718/pexels-photo-29393718.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 'الأكثر مبيعاً', true, 10),

('heel-warda', 'كعب ورد', 'كعب وردي بنعومة الورد', 'shoes', 290, NULL,
 'كعب وردي هادئ بلمسة ساتان خفيفة، صُمم ليكون بطل إطلالاتك الرقيقة. مريح طوال اليوم.',
 'https://images.pexels.com/photos/22589306/pexels-photo-22589306.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 'جديد', true, 8),

('heel-naseem', 'كعب نسيم', 'بومب كلاسيك نود', 'shoes', 280, NULL,
 'بومب كلاسيك من الجلد الناعم، خامة تتنفس ومقاسات مضبوطة. البسيها من الصباح لآخر سهرة.',
 'https://images.pexels.com/photos/18935118/pexels-photo-18935118.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 NULL, false, 12),

('heel-layl', 'كعب ليل', 'كعب سهرة بلمعة هادئة', 'shoes', 310, NULL,
 'كعب سهرة بلون العنبر الدافئ ولمعة خفيفة ما تحط عيون. للليبات اللي تستاهل.',
 'https://images.pexels.com/photos/2965276/pexels-photo-2965276.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 NULL, false, 9),

('sandal-jawhara', 'صندال جوهرة', 'صندال جلد طبيعي', 'shoes', 240, 280,
 'صندال جلد طبيعي بحزام رفيع وقاعدة مخملية، من أخف أحذيتنا. رفيقة الصيف اليومي.',
 'https://images.pexels.com/photos/26965817/pexels-photo-26965817.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 'وصل حديثاً', true, 14),

('sandal-hadi', 'صندال هادئ', 'صندال بيج بلمسة رقيقة', 'shoes', 210, NULL,
 'صندال بيج بدرجات هادية وسرعة ارتداء، يناسب الشوارع والمناسبات الخفيفة معاً.',
 'https://images.pexels.com/photos/9267599/pexels-photo-9267599.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1125',
 NULL, false, 16)
ON CONFLICT (slug) DO NOTHING;
