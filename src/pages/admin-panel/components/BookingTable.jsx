import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { bookingService } from '../../../services/bookingService';

const BookingTable = ({ bookings, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBookings, setFilteredBookings] = useState(bookings);
  const [updating, setUpdating] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm?.trim()) {
      setFilteredBookings(bookings);
      return;
    }
    
    try {
      const results = await bookingService?.searchBookings(searchTerm);
      setFilteredBookings(results);
    } catch (err) {
      alert(err?.message || 'Search failed');
    }
  };

  const handleUpdateStatus = async (bookingId, newStatus, type) => {
    try {
      setUpdating(bookingId);
      if (type === 'booking') {
        await bookingService?.updateBookingStatus(bookingId, newStatus);
      } else {
        await bookingService?.updatePaymentStatus(bookingId, newStatus);
      }
      await onRefresh();
    } catch (err) {
      alert(err?.message || 'Failed to update status');
    } finally {
      setUpdating(null);
    }
  };

  const getStatusBadge = (status, type) => {
    const statusConfig = {
      booking: {
        pending: { color: 'bg-warning/10 text-warning border-warning/20', label: 'Pending' },
        confirmed: { color: 'bg-success/10 text-success border-success/20', label: 'Confirmed' },
        completed: { color: 'bg-primary/10 text-primary border-primary/20', label: 'Completed' },
        cancelled: { color: 'bg-error/10 text-error border-error/20', label: 'Cancelled' }
      },
      payment: {
        pending: { color: 'bg-warning/10 text-warning border-warning/20', label: 'Pending' },
        paid: { color: 'bg-success/10 text-success border-success/20', label: 'Paid' },
        refunded: { color: 'bg-muted text-muted-foreground border-border', label: 'Refunded' }
      }
    };
    
    const config = statusConfig?.[type]?.[status] || { color: 'bg-muted text-muted-foreground border-border', label: status };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-md border ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const displayBookings = searchTerm?.trim() ? filteredBookings : bookings;

  if (!displayBookings || displayBookings?.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Calendar" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
        <p className="text-muted-foreground">No bookings found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            onKeyPress={(e) => e?.key === 'Enter' && handleSearch()}
            placeholder="Search by reference, name, or email..."
            className="w-full h-10 pl-10 pr-4 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
        <Button onClick={handleSearch} variant="outline">
          Search
        </Button>
        {searchTerm && (
          <Button onClick={() => { setSearchTerm(''); setFilteredBookings(bookings); }} variant="ghost">
            Clear
          </Button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Reference</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Customer</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Tour</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Dates</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Group Size</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Payment</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayBookings?.map((booking) => (
              <tr key={booking?.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                <td className="py-4 px-4">
                  <p className="font-medium text-foreground text-sm">{booking?.referenceNumber}</p>
                </td>
                <td className="py-4 px-4">
                  <p className="font-medium text-foreground text-sm">{booking?.customerName}</p>
                  <p className="text-xs text-muted-foreground">{booking?.customerEmail}</p>
                  <p className="text-xs text-muted-foreground">{booking?.customerPhone}</p>
                </td>
                <td className="py-4 px-4">
                  <p className="font-medium text-foreground text-sm">{booking?.tourName}</p>
                  <p className="text-xs text-muted-foreground">{booking?.tourDestination}</p>
                </td>
                <td className="py-4 px-4 text-sm text-muted-foreground">
                  <p>{booking?.startDate}</p>
                  <p className="text-xs">to {booking?.endDate}</p>
                </td>
                <td className="py-4 px-4 text-sm text-muted-foreground">{booking?.groupSize} people</td>
                <td className="py-4 px-4">
                  <p className="font-semibold text-foreground">₹{booking?.totalAmount?.toLocaleString('en-IN')}</p>
                </td>
                <td className="py-4 px-4">{getStatusBadge(booking?.paymentStatus, 'payment')}</td>
                <td className="py-4 px-4">{getStatusBadge(booking?.bookingStatus, 'booking')}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end gap-2">
                    {booking?.bookingStatus === 'pending' && (
                      <Button
                        size="xs"
                        variant="success"
                        onClick={() => handleUpdateStatus(booking?.id, 'confirmed', 'booking')}
                        loading={updating === booking?.id}
                      >
                        Confirm
                      </Button>
                    )}
                    {booking?.paymentStatus === 'pending' && (
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => handleUpdateStatus(booking?.id, 'paid', 'payment')}
                        loading={updating === booking?.id}
                      >
                        Mark Paid
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;