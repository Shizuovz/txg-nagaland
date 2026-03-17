import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { sendApprovalEmail, getApprovalEmailContent } from '@/utils/firebaseEmailService';
import { toast } from 'sonner';

const EmailTestComponent = () => {
  const [testEmail, setTestEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const mockRegistrationData = {
    registrationId: 'TEST1234',
    registrationType: 'college',
    teamName: 'Test Team',
    captainName: 'Test Captain',
    captainEmail: testEmail,
    collegeName: 'Test College'
  };

  const testApprovalEmail = async () => {
    if (!testEmail) {
      toast.error('Please enter a test email address');
      return;
    }

    setIsSending(true);
    try {
      const emailData = getApprovalEmailContent(mockRegistrationData, 'approved');
      const success = await sendApprovalEmail(emailData);
      
      if (success) {
        toast.success('Approval email sent successfully!');
      } else {
        toast.error('Failed to send approval email');
      }
    } catch (error) {
      console.error('Error sending test email:', error);
      toast.error('Error sending test email');
    } finally {
      setIsSending(false);
    }
  };

  const testRejectionEmail = async () => {
    if (!testEmail) {
      toast.error('Please enter a test email address');
      return;
    }

    setIsSending(true);
    try {
      const emailData = getApprovalEmailContent(mockRegistrationData, 'rejected');
      const success = await sendApprovalEmail(emailData);
      
      if (success) {
        toast.success('Rejection email sent successfully!');
      } else {
        toast.error('Failed to send rejection email');
      }
    } catch (error) {
      console.error('Error sending test email:', error);
      toast.error('Error sending test email');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Email Service Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="testEmail">Test Email Address</Label>
          <Input
            id="testEmail"
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="Enter email to test"
          />
        </div>
        
        <div className="space-y-2">
          <Button 
            onClick={testApprovalEmail} 
            disabled={isSending || !testEmail}
            className="w-full"
          >
            {isSending ? 'Sending...' : 'Test Approval Email'}
          </Button>
          
          <Button 
            onClick={testRejectionEmail} 
            disabled={isSending || !testEmail}
            variant="outline"
            className="w-full"
          >
            {isSending ? 'Sending...' : 'Test Rejection Email'}
          </Button>
        </div>
        
        <div className="text-sm text-gray-600">
          <p><strong>Note:</strong> This requires EmailJS configuration in .env file</p>
          <p>Check browser console for detailed logs</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailTestComponent;
