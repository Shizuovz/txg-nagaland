import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, Loader2, Database } from 'lucide-react';
import { app, db } from '@/lib/firebase';
import { collection, getDocs, query, limit, getDoc, doc } from 'firebase/firestore';
import { FirebaseService } from '@/lib/firebase';

const FirebaseConnectionTest = () => {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    testFirebaseConnection();
  }, []);

  const testFirebaseConnection = async () => {
    try {
      setStatus('loading');
      
      // Test 1: Check Firebase app initialization
      if (!app) {
        throw new Error('Firebase app not initialized');
      }

      // Test 2: Check Firestore connection
      if (!db) {
        throw new Error('Firestore not initialized');
      }

      // Test 3: Try to create a collection reference
      const testCollection = collection(db, 'test-connection');
      
      // Test 4: Try actual Firebase operations
      let serviceTest = 'Not Tested';
      let dataTest = 'Not Tested';
      
      try {
        // Test FirebaseService instantiation
        const firebaseService = new FirebaseService();
        serviceTest = 'Success';
        
        // Test actual data read - try to get games
        const games = await firebaseService.getGames();
        dataTest = `Success (${games.length} games)`;
        
        console.log('✅ Firebase Service Test Passed:', { gamesCount: games.length });
      } catch (serviceError) {
        serviceTest = `Failed: ${serviceError instanceof Error ? serviceError.message : 'Unknown error'}`;
        console.warn('⚠️ Firebase Service Test Failed:', serviceError);
      }
      
      // Get connection details
      const connectionDetails = {
        firebaseApp: !!app,
        firestore: !!db,
        projectName: app.options.projectId,
        authDomain: app.options.authDomain,
        apiKey: app.options.apiKey ? 'Present' : 'Missing',
        appInitialized: app.name,
        serviceTest,
        dataTest,
        timestamp: new Date().toISOString()
      };

      setDetails(connectionDetails);
      setStatus('connected');
      console.log('✅ Firebase Connection Test Passed:', connectionDetails);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
      console.error('❌ Firebase Connection Test Failed:', err);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-5 h-5 animate-spin" />;
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'loading':
        return <Badge variant="secondary">Testing...</Badge>;
      case 'connected':
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {getStatusIcon()}
              Firebase Connection Test
              {getStatusBadge()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {status === 'loading' && (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Testing Firebase connection...</p>
              </div>
            )}

            {status === 'connected' && details && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">✅ Connection Successful!</h3>
                  <p className="text-green-700 text-sm mb-4">
                    Firebase is properly configured and connected.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Connection Details:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Firebase App:</span>
                      <span className={details.firebaseApp ? 'text-green-600' : 'text-red-600'}>
                        {details.firebaseApp ? 'Initialized' : 'Not Initialized'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Firestore:</span>
                      <span className={details.firestore ? 'text-green-600' : 'text-red-600'}>
                        {details.firestore ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Project ID:</span>
                      <span className="font-mono text-xs">{details.projectName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Auth Domain:</span>
                      <span className="font-mono text-xs">{details.authDomain}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">API Key:</span>
                      <span className={details.apiKey === 'Present' ? 'text-green-600' : 'text-red-600'}>
                        {details.apiKey}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">App Name:</span>
                      <span className="font-mono text-xs">{details.appInitialized}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service Test:</span>
                      <span className={details.serviceTest.includes('Success') ? 'text-green-600' : 'text-red-600'}>
                        {details.serviceTest}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data Test:</span>
                      <span className={details.dataTest.includes('Success') ? 'text-green-600' : 'text-red-600'}>
                        {details.dataTest}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Test Time:</span>
                      <span className="font-mono text-xs">{details.timestamp}</span>
                    </div>
                  </div>
                </div>

                <Button onClick={testFirebaseConnection} className="w-full">
                  Retest Connection
                </Button>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">❌ Connection Failed!</h3>
                  <p className="text-red-700 text-sm mb-2">
                    Firebase connection test failed.
                  </p>
                  <p className="text-red-600 text-xs font-mono bg-red-100 p-2 rounded">
                    {error}
                  </p>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Troubleshooting Steps:</h4>
                  <ul className="text-yellow-700 text-sm space-y-1 list-disc list-inside">
                    <li>Check Firebase configuration in src/lib/firebase.ts</li>
                    <li>Verify project ID and API key are correct</li>
                    <li>Ensure Firebase project is active</li>
                    <li>Check network connectivity</li>
                    <li>Verify Firestore rules allow read access</li>
                  </ul>
                </div>

                <Button onClick={testFirebaseConnection} className="w-full">
                  Retry Connection
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FirebaseConnectionTest;
