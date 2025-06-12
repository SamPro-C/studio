// src/app/dashboard/landlord/notifications/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Bell, BotMessageSquare, Settings } from 'lucide-react';

export default function NotificationsHubPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/landlord">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <Bell className="mr-3 h-7 w-7" /> Notifications Center
            </h1>
          </div>
          <Button variant="outline" asChild>
            <Link href="/dashboard/landlord/notifications/settings">
                <Settings className="mr-2 h-4 w-4" /> Notification Settings
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Your Communications</CardTitle>
            <CardDescription>
              Access AI-powered notification suggestions, view sent notifications, and configure your preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                    <BotMessageSquare className="mr-2 h-6 w-6 text-primary" />
                    AI Notification Assistant
                </CardTitle>
                <CardDescription>
                    Generate optimized notifications for tenants and workers using AI.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    Provide context about the property, tenant/worker, and notification type to get tailored suggestions.
                </p>
                <Button asChild>
                  <Link href="/dashboard/landlord/notifications/ai-suggestions">
                    Get AI Suggestions
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                    <Bell className="mr-2 h-6 w-6 text-primary" />
                    Notification History
                </CardTitle>
                <CardDescription>
                    View past notifications sent to tenants and workers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  (This section will display a list or log of previously sent notifications - To be implemented)
                </p>
                <Button variant="outline" disabled>View History (Coming Soon)</Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
        
        <div className="p-6 border border-dashed rounded-md bg-muted/50 text-center">
            <p className="text-muted-foreground">
                Future enhancements may include direct sending of notifications from this hub.
            </p>
        </div>

      </main>
    </div>
  );
}
