import { supabase } from '../lib/supabase';

export const bookingService = {
  // Get all bookings
  async getAllBookings() {
    const { data, error } = await supabase?.from('bookings')?.select(`
        *,
        tours(name, destination)
      `)?.order('created_at', { ascending: false });

    if (error) throw error;

    return data?.map(booking => ({
      id: booking?.id,
      tourId: booking?.tour_id,
      tourName: booking?.tours?.name || 'N/A',
      tourDestination: booking?.tours?.destination || 'N/A',
      referenceNumber: booking?.reference_number,
      customerName: booking?.customer_name,
      customerEmail: booking?.customer_email,
      customerPhone: booking?.customer_phone,
      groupSize: booking?.group_size,
      startDate: booking?.start_date,
      endDate: booking?.end_date,
      totalAmount: booking?.total_amount,
      paymentStatus: booking?.payment_status,
      bookingStatus: booking?.booking_status,
      specialRequests: booking?.special_requests,
      createdAt: booking?.created_at,
      updatedAt: booking?.updated_at
    })) || [];
  },

  // Get booking by ID
  async getBookingById(bookingId) {
    const { data, error } = await supabase?.from('bookings')?.select(`
        *,
        tours(name, destination, duration)
      `)?.eq('id', bookingId)?.single();

    if (error) throw error;

    return {
      id: data?.id,
      tourId: data?.tour_id,
      tourName: data?.tours?.name || 'N/A',
      tourDestination: data?.tours?.destination || 'N/A',
      tourDuration: data?.tours?.duration || 'N/A',
      referenceNumber: data?.reference_number,
      customerName: data?.customer_name,
      customerEmail: data?.customer_email,
      customerPhone: data?.customer_phone,
      groupSize: data?.group_size,
      startDate: data?.start_date,
      endDate: data?.end_date,
      totalAmount: data?.total_amount,
      paymentStatus: data?.payment_status,
      bookingStatus: data?.booking_status,
      specialRequests: data?.special_requests,
      createdAt: data?.created_at,
      updatedAt: data?.updated_at
    };
  },

  // Update booking status
  async updateBookingStatus(bookingId, status) {
    const { data, error } = await supabase?.from('bookings')?.update({
        booking_status: status,
        updated_at: new Date()?.toISOString()
      })?.eq('id', bookingId)?.select()?.single();

    if (error) throw error;
    return data;
  },

  // Update payment status
  async updatePaymentStatus(bookingId, status) {
    const { data, error } = await supabase?.from('bookings')?.update({
        payment_status: status,
        updated_at: new Date()?.toISOString()
      })?.eq('id', bookingId)?.select()?.single();

    if (error) throw error;
    return data;
  },

  // Search bookings
  async searchBookings(searchTerm) {
    const { data, error } = await supabase?.from('bookings')?.select(`
        *,
        tours(name, destination)
      `)?.or(`reference_number.ilike.%${searchTerm}%,customer_name.ilike.%${searchTerm}%,customer_email.ilike.%${searchTerm}%`)?.order('created_at', { ascending: false });

    if (error) throw error;

    return data?.map(booking => ({
      id: booking?.id,
      tourId: booking?.tour_id,
      tourName: booking?.tours?.name || 'N/A',
      tourDestination: booking?.tours?.destination || 'N/A',
      referenceNumber: booking?.reference_number,
      customerName: booking?.customer_name,
      customerEmail: booking?.customer_email,
      customerPhone: booking?.customer_phone,
      groupSize: booking?.group_size,
      startDate: booking?.start_date,
      endDate: booking?.end_date,
      totalAmount: booking?.total_amount,
      paymentStatus: booking?.payment_status,
      bookingStatus: booking?.booking_status,
      createdAt: booking?.created_at
    })) || [];
  }
};