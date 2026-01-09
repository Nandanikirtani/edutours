-- Admin Tour Management System Migration
-- Tables: tours, tour_images, tour_pricing, group_discounts, seo_metadata, bookings

-- Create ENUM types
CREATE TYPE public.tour_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE public.student_level AS ENUM ('school', 'college', 'postgraduate');
CREATE TYPE public.tour_type AS ENUM ('cultural-heritage', 'industrial-tour', 'adventure-learning', 'learning-camp');
CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE public.payment_status AS ENUM ('pending', 'paid', 'refunded');

-- Tours table (main tour packages)
CREATE TABLE public.tours (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    destination TEXT NOT NULL,
    duration TEXT NOT NULL,
    description TEXT,
    educational_focus TEXT,
    student_level public.student_level NOT NULL,
    tour_type public.tour_type NOT NULL,
    status public.tour_status DEFAULT 'draft'::public.tour_status,
    is_featured BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    group_discount_enabled BOOLEAN DEFAULT true,
    availability TEXT DEFAULT 'available',
    rating DECIMAL(2,1) DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tour images table (up to 5 images per tour)
CREATE TABLE public.tour_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tour_id UUID REFERENCES public.tours(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_alt TEXT NOT NULL,
    display_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tour pricing table
CREATE TABLE public.tour_pricing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tour_id UUID UNIQUE REFERENCES public.tours(id) ON DELETE CASCADE,
    individual_price DECIMAL(10,2) NOT NULL,
    group_5_plus_price DECIMAL(10,2),
    group_10_plus_price DECIMAL(10,2),
    group_20_plus_price DECIMAL(10,2),
    gst_percentage DECIMAL(5,2) DEFAULT 5.00,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Group discounts table
CREATE TABLE public.group_discounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tour_id UUID REFERENCES public.tours(id) ON DELETE CASCADE,
    min_group_size INTEGER NOT NULL,
    discount_percentage DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- SEO metadata table
CREATE TABLE public.seo_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tour_id UUID UNIQUE REFERENCES public.tours(id) ON DELETE CASCADE,
    page_url TEXT NOT NULL,
    page_title TEXT NOT NULL,
    meta_description TEXT NOT NULL,
    meta_keywords TEXT[],
    og_title TEXT,
    og_description TEXT,
    og_image TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table (customer booking history)
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tour_id UUID REFERENCES public.tours(id) ON DELETE SET NULL,
    reference_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    group_size INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_status public.payment_status DEFAULT 'pending'::public.payment_status,
    booking_status public.booking_status DEFAULT 'pending'::public.booking_status,
    special_requests TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Catalog page SEO metadata
CREATE TABLE public.catalog_seo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_url TEXT NOT NULL DEFAULT '/tour-catalog',
    page_title TEXT NOT NULL,
    meta_description TEXT NOT NULL,
    meta_keywords TEXT[],
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_tours_status ON public.tours(status);
CREATE INDEX idx_tours_featured ON public.tours(is_featured);
CREATE INDEX idx_tour_images_tour_id ON public.tour_images(tour_id);
CREATE INDEX idx_tour_pricing_tour_id ON public.tour_pricing(tour_id);
CREATE INDEX idx_bookings_tour_id ON public.bookings(tour_id);
CREATE INDEX idx_bookings_reference ON public.bookings(reference_number);
CREATE INDEX idx_bookings_customer_email ON public.bookings(customer_email);

-- Enable RLS
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_discounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalog_seo ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public read, authenticated write (admin access)
CREATE POLICY "public_read_tours"
ON public.tours
FOR SELECT
TO public
USING (status = 'published'::public.tour_status);

CREATE POLICY "authenticated_manage_tours"
ON public.tours
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "public_read_tour_images"
ON public.tour_images
FOR SELECT
TO public
USING (true);

CREATE POLICY "authenticated_manage_tour_images"
ON public.tour_images
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "public_read_tour_pricing"
ON public.tour_pricing
FOR SELECT
TO public
USING (true);

CREATE POLICY "authenticated_manage_tour_pricing"
ON public.tour_pricing
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "public_read_group_discounts"
ON public.group_discounts
FOR SELECT
TO public
USING (true);

CREATE POLICY "authenticated_manage_group_discounts"
ON public.group_discounts
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "public_read_seo_metadata"
ON public.seo_metadata
FOR SELECT
TO public
USING (true);

CREATE POLICY "authenticated_manage_seo_metadata"
ON public.seo_metadata
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "authenticated_read_bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "authenticated_manage_bookings"
ON public.bookings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "public_read_catalog_seo"
ON public.catalog_seo
FOR SELECT
TO public
USING (true);

CREATE POLICY "authenticated_manage_catalog_seo"
ON public.catalog_seo
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Mock data for testing
DO $$
DECLARE
    tour1_id UUID := gen_random_uuid();
    tour2_id UUID := gen_random_uuid();
    tour3_id UUID := gen_random_uuid();
BEGIN
    -- Insert sample tours
    INSERT INTO public.tours (id, name, destination, duration, description, educational_focus, student_level, tour_type, status, is_featured, is_new, rating, review_count)
    VALUES
        (tour1_id, 'Golden Triangle Heritage Tour', 'Delhi, Agra, Jaipur', '5 Days / 4 Nights', 'Explore Delhi, Agra, and Jaipur magnificent monuments and learn about Mughal and Rajput history', 'History & Culture', 'school', 'cultural-heritage', 'published', true, false, 4.8, 342),
        (tour2_id, 'ISRO Space Center Industrial Tour', 'Bangalore, Karnataka', '3 Days / 2 Nights', 'Visit leading space research facilities and learn about India space program', 'Science & Technology', 'college', 'industrial-tour', 'published', true, true, 4.9, 198),
        (tour3_id, 'Himalayan Adventure Learning Camp', 'Manali, Himachal Pradesh', '7 Days / 6 Nights', 'Experience mountain trekking, camping, and environmental education in the Himalayas', 'Environment & Nature', 'school', 'adventure-learning', 'published', false, true, 4.7, 276);

    -- Insert tour images
    INSERT INTO public.tour_images (tour_id, image_url, image_alt, display_order)
    VALUES
        (tour1_id, 'https://images.unsplash.com/photo-1669464957415-a4662a931524', 'Majestic Taj Mahal monument with white marble domes and minarets against clear blue sky in Agra India', 1),
        (tour1_id, 'https://images.unsplash.com/photo-1600615237468-14076f10dce2', 'Historic India Gate war memorial with tall stone archway and green lawns in New Delhi', 2),
        (tour1_id, 'https://images.unsplash.com/photo-1575188566830-ccc495d2f7af', 'Ornate Hawa Mahal palace with pink sandstone facade and intricate lattice windows in Jaipur Rajasthan', 3),
        (tour2_id, 'https://images.unsplash.com/photo-1710761382335-66d7db319f41', 'Modern rocket launch facility with tall white spacecraft on launch pad surrounded by technical infrastructure and clear sky', 1),
        (tour2_id, 'https://images.unsplash.com/photo-1662476210613-11800fffea92', 'Modern planetarium dome interior showing projected night sky with constellations and planets while students sit in comfortable seats observing', 2),
        (tour3_id, 'https://images.unsplash.com/photo-1618246676962-425dc442fea9', 'Snow-capped Himalayan mountain peaks with lush green valleys and winding trails in foreground under bright sunlight', 1),
        (tour3_id, 'https://images.unsplash.com/photo-1675854973712-cdce5dddaace', 'Colorful camping tents set up on green mountain meadow with snow-capped Himalayan peaks in background and students gathered around campfire', 2);

    -- Insert tour pricing
    INSERT INTO public.tour_pricing (tour_id, individual_price, group_5_plus_price, group_10_plus_price, group_20_plus_price)
    VALUES
        (tour1_id, 18500.00, 17000.00, 16000.00, 15000.00),
        (tour2_id, 12000.00, 11000.00, 10500.00, 10000.00),
        (tour3_id, 24500.00, 23000.00, 22000.00, 21000.00);

    -- Insert group discounts
    INSERT INTO public.group_discounts (tour_id, min_group_size, discount_percentage)
    VALUES
        (tour1_id, 5, 8.11),
        (tour1_id, 10, 13.51),
        (tour1_id, 20, 18.92),
        (tour2_id, 5, 8.33),
        (tour2_id, 10, 12.50),
        (tour2_id, 20, 16.67);

    -- Insert SEO metadata
    INSERT INTO public.seo_metadata (tour_id, page_url, page_title, meta_description, meta_keywords)
    VALUES
        (tour1_id, '/tour-package-details?id=' || tour1_id, 'Golden Triangle Heritage Tour - Educational Tours India', 'Explore the magnificent Golden Triangle circuit covering Delhi, Agra, and Jaipur. Perfect educational tour for students to learn about Mughal and Rajput history.', ARRAY['golden triangle tour', 'delhi agra jaipur', 'heritage tour', 'educational tour', 'student tour india']),
        (tour2_id, '/tour-package-details?id=' || tour2_id, 'ISRO Space Center Tour - Science Education Trip', 'Visit ISRO space research facilities in Bangalore. Educational industrial tour for college students interested in space science and technology.', ARRAY['isro tour', 'space center visit', 'bangalore industrial tour', 'science education', 'space technology']),
        (tour3_id, '/tour-package-details?id=' || tour3_id, 'Himalayan Adventure Camp - Environmental Learning', 'Experience adventure learning in the Himalayas with trekking, camping, and environmental education. Perfect for school students.', ARRAY['himalayan adventure', 'manali camp', 'adventure learning', 'environmental education', 'trekking camp']);

    -- Insert catalog SEO
    INSERT INTO public.catalog_seo (page_url, page_title, meta_description, meta_keywords)
    VALUES
        ('/tour-catalog', 'Educational Tour Packages - Browse All Tours | EduTours', 'Browse our comprehensive catalog of educational tour packages for students. Find heritage tours, industrial visits, adventure camps, and learning experiences across India.', ARRAY['educational tours', 'student tours', 'tour catalog', 'school trips', 'college tours', 'learning experiences']);

    -- Insert sample bookings
    INSERT INTO public.bookings (tour_id, reference_number, customer_name, customer_email, customer_phone, group_size, start_date, end_date, total_amount, payment_status, booking_status)
    VALUES
        (tour1_id, 'EDT2026001234', 'Rajesh Kumar', 'rajesh.kumar@example.com', '+919876543210', 25, '2026-02-15', '2026-02-19', 393750.00, 'paid', 'confirmed'),
        (tour2_id, 'EDT2026001567', 'Priya Sharma', 'priya.sharma@example.com', '+919876543211', 20, '2026-03-05', '2026-03-07', 210000.00, 'pending', 'pending'),
        (tour3_id, 'EDT2026001890', 'Amit Singh', 'amit.singh@example.com', '+919876543212', 15, '2026-04-10', '2026-04-16', 382500.00, 'paid', 'confirmed');
END $$;