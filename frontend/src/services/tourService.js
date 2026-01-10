import { supabase } from '../lib/supabase';

export const tourService = {
  // Get all tours with images and pricing
  async getAllTours() {
    const { data, error } = await supabase?.from('tours')?.select(`
        *,
        tour_images(*),
        tour_pricing(*),
        seo_metadata(*)
      `)?.order('created_at', { ascending: false });

    if (error) throw error;

    return data?.map(tour => ({
      id: tour?.id,
      name: tour?.name,
      destination: tour?.destination,
      duration: tour?.duration,
      description: tour?.description,
      educationalFocus: tour?.educational_focus,
      studentLevel: tour?.student_level,
      tourType: tour?.tour_type,
      status: tour?.status,
      isFeatured: tour?.is_featured,
      isNew: tour?.is_new,
      groupDiscountEnabled: tour?.group_discount_enabled,
      availability: tour?.availability,
      rating: tour?.rating,
      reviewCount: tour?.review_count,
      images: tour?.tour_images?.map(img => ({
        id: img?.id,
        imageUrl: img?.image_url,
        imageAlt: img?.image_alt,
        displayOrder: img?.display_order
      })) || [],
      pricing: tour?.tour_pricing ? {
        id: tour?.tour_pricing?.id,
        individualPrice: tour?.tour_pricing?.individual_price,
        group5PlusPrice: tour?.tour_pricing?.group_5_plus_price,
        group10PlusPrice: tour?.tour_pricing?.group_10_plus_price,
        group20PlusPrice: tour?.tour_pricing?.group_20_plus_price,
        gstPercentage: tour?.tour_pricing?.gst_percentage
      } : null,
      seoMetadata: tour?.seo_metadata ? {
        pageUrl: tour?.seo_metadata?.page_url,
        pageTitle: tour?.seo_metadata?.page_title,
        metaDescription: tour?.seo_metadata?.meta_description,
        metaKeywords: tour?.seo_metadata?.meta_keywords
      } : null,
      createdAt: tour?.created_at,
      updatedAt: tour?.updated_at
    })) || [];
  },

  // Get single tour by ID
  async getTourById(tourId) {
    const { data, error } = await supabase?.from('tours')?.select(`
        *,
        tour_images(*),
        tour_pricing(*),
        group_discounts(*),
        seo_metadata(*)
      `)?.eq('id', tourId)?.single();

    if (error) throw error;

    return {
      id: data?.id,
      name: data?.name,
      destination: data?.destination,
      duration: data?.duration,
      description: data?.description,
      educationalFocus: data?.educational_focus,
      studentLevel: data?.student_level,
      tourType: data?.tour_type,
      status: data?.status,
      isFeatured: data?.is_featured,
      isNew: data?.is_new,
      groupDiscountEnabled: data?.group_discount_enabled,
      availability: data?.availability,
      rating: data?.rating,
      reviewCount: data?.review_count,
      images: data?.tour_images?.map(img => ({
        id: img?.id,
        imageUrl: img?.image_url,
        imageAlt: img?.image_alt,
        displayOrder: img?.display_order
      })) || [],
      pricing: data?.tour_pricing ? {
        id: data?.tour_pricing?.id,
        individualPrice: data?.tour_pricing?.individual_price,
        group5PlusPrice: data?.tour_pricing?.group_5_plus_price,
        group10PlusPrice: data?.tour_pricing?.group_10_plus_price,
        group20PlusPrice: data?.tour_pricing?.group_20_plus_price,
        gstPercentage: data?.tour_pricing?.gst_percentage
      } : null,
      groupDiscounts: data?.group_discounts?.map(discount => ({
        id: discount?.id,
        minGroupSize: discount?.min_group_size,
        discountPercentage: discount?.discount_percentage
      })) || [],
      seoMetadata: data?.seo_metadata ? {
        id: data?.seo_metadata?.id,
        pageUrl: data?.seo_metadata?.page_url,
        pageTitle: data?.seo_metadata?.page_title,
        metaDescription: data?.seo_metadata?.meta_description,
        metaKeywords: data?.seo_metadata?.meta_keywords
      } : null,
      createdAt: data?.created_at,
      updatedAt: data?.updated_at
    };
  },

  // Create new tour
  async createTour(tourData) {
    const { data, error } = await supabase?.from('tours')?.insert({
        name: tourData?.name,
        destination: tourData?.destination,
        duration: tourData?.duration,
        description: tourData?.description,
        educational_focus: tourData?.educationalFocus,
        student_level: tourData?.studentLevel,
        tour_type: tourData?.tourType,
        status: tourData?.status || 'draft',
        is_featured: tourData?.isFeatured || false,
        is_new: tourData?.isNew || false,
        group_discount_enabled: tourData?.groupDiscountEnabled !== false,
        availability: tourData?.availability || 'available'
      })?.select()?.single();

    if (error) throw error;
    return data;
  },

  // Update tour
  async updateTour(tourId, tourData) {
    const { data, error } = await supabase?.from('tours')?.update({
        name: tourData?.name,
        destination: tourData?.destination,
        duration: tourData?.duration,
        description: tourData?.description,
        educational_focus: tourData?.educationalFocus,
        student_level: tourData?.studentLevel,
        tour_type: tourData?.tourType,
        status: tourData?.status,
        is_featured: tourData?.isFeatured,
        is_new: tourData?.isNew,
        group_discount_enabled: tourData?.groupDiscountEnabled,
        availability: tourData?.availability,
        updated_at: new Date()?.toISOString()
      })?.eq('id', tourId)?.select()?.single();

    if (error) throw error;
    return data;
  },

  // Delete tour
  async deleteTour(tourId) {
    const { error } = await supabase?.from('tours')?.delete()?.eq('id', tourId);

    if (error) throw error;
  },

  // Add tour images
  async addTourImages(tourId, images) {
    const imageData = images?.map((img, index) => ({
      tour_id: tourId,
      image_url: img?.imageUrl,
      image_alt: img?.imageAlt,
      display_order: img?.displayOrder || index + 1
    }));

    const { data, error } = await supabase?.from('tour_images')?.insert(imageData)?.select();

    if (error) throw error;
    return data;
  },

  // Delete tour image
  async deleteTourImage(imageId) {
    const { error } = await supabase?.from('tour_images')?.delete()?.eq('id', imageId);

    if (error) throw error;
  },

  // Update tour pricing
  async updateTourPricing(tourId, pricingData) {
    const { data, error } = await supabase?.from('tour_pricing')?.upsert({
        tour_id: tourId,
        individual_price: pricingData?.individualPrice,
        group_5_plus_price: pricingData?.group5PlusPrice,
        group_10_plus_price: pricingData?.group10PlusPrice,
        group_20_plus_price: pricingData?.group20PlusPrice,
        gst_percentage: pricingData?.gstPercentage || 5.00,
        updated_at: new Date()?.toISOString()
      })?.select()?.single();

    if (error) throw error;
    return data;
  },

  // Update SEO metadata
  async updateSeoMetadata(tourId, seoData) {
    const { data, error } = await supabase?.from('seo_metadata')?.upsert({
        tour_id: tourId,
        page_url: seoData?.pageUrl,
        page_title: seoData?.pageTitle,
        meta_description: seoData?.metaDescription,
        meta_keywords: seoData?.metaKeywords,
        updated_at: new Date()?.toISOString()
      })?.select()?.single();

    if (error) throw error;
    return data;
  },

  // Update catalog SEO
  async updateCatalogSeo(seoData) {
    const { data, error } = await supabase?.from('catalog_seo')?.upsert({
        page_url: seoData?.pageUrl || '/tour-catalog',
        page_title: seoData?.pageTitle,
        meta_description: seoData?.metaDescription,
        meta_keywords: seoData?.metaKeywords,
        updated_at: new Date()?.toISOString()
      })?.select()?.single();

    if (error) throw error;
    return data;
  },

  // Get catalog SEO
  async getCatalogSeo() {
    const { data, error } = await supabase?.from('catalog_seo')?.select('*')?.limit(1)?.single();

    if (error && error?.code !== 'PGRST116') throw error;
    
    if (!data) return null;

    return {
      id: data?.id,
      pageUrl: data?.page_url,
      pageTitle: data?.page_title,
      metaDescription: data?.meta_description,
      metaKeywords: data?.meta_keywords
    };
  }
};