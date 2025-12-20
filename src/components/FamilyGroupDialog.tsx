import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Copy, LogOut, UserPlus, Crown, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useFamilyGroup, type FamilyGroup, type FamilyMember } from "@/hooks/useFamilyGroup";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface FamilyGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FamilyGroupDialog({ open, onOpenChange }: FamilyGroupDialogProps) {
  const { user } = useAuth();
  const { 
    familyGroup, 
    members, 
    loading,
    createFamilyGroup, 
    joinFamilyGroup, 
    leaveFamilyGroup 
  } = useFamilyGroup();

  const [groupName, setGroupName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCreate = async () => {
    if (!groupName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your family group.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const result = await createFamilyGroup(groupName.trim(), displayName.trim() || undefined);
    setIsSubmitting(false);

    if (result.error) {
      toast({
        title: "Error creating group",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Family group created!",
        description: `Share the invite code with your family: ${result.inviteCode}`,
      });
      setGroupName("");
      setDisplayName("");
    }
  };

  const handleJoin = async () => {
    if (!inviteCode.trim()) {
      toast({
        title: "Code required",
        description: "Please enter the invite code.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const result = await joinFamilyGroup(inviteCode.trim(), displayName.trim() || undefined);
    setIsSubmitting(false);

    if (result.error) {
      toast({
        title: "Error joining group",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Joined family group!",
        description: `You're now part of "${result.groupName}"`,
      });
      setInviteCode("");
      setDisplayName("");
    }
  };

  const handleLeave = async () => {
    setIsSubmitting(true);
    const result = await leaveFamilyGroup();
    setIsSubmitting(false);

    if (result.error) {
      toast({
        title: "Error leaving group",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Left family group",
        description: "You've left the family group.",
      });
    }
  };

  const copyInviteCode = () => {
    if (familyGroup) {
      navigator.clipboard.writeText(familyGroup.inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Invite code copied to clipboard.",
      });
    }
  };

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // If user is in a family group, show the group info
  if (familyGroup) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-serif text-xl">
              <Users className="h-5 w-5 text-primary" />
              {familyGroup.name}
            </DialogTitle>
            <DialogDescription>
              Share recipes with your family members
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Invite Code */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                Invite Code
              </Label>
              <div className="flex items-center gap-2 mt-2">
                <code className="flex-1 px-3 py-2 rounded-lg bg-background font-mono text-lg tracking-wider">
                  {familyGroup.inviteCode}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyInviteCode}
                  className={cn(copied && "text-primary")}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Share this code with family members to let them join
              </p>
            </div>

            {/* Members */}
            <div>
              <Label className="text-xs text-muted-foreground uppercase tracking-wide">
                Members ({members.length})
              </Label>
              <div className="space-y-2 mt-2">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {(member.displayName || 'U').charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium">
                        {member.displayName || 'Family Member'}
                      </span>
                      {member.userId === user?.id && (
                        <Badge variant="outline" className="text-xs">You</Badge>
                      )}
                    </div>
                    {member.userId === familyGroup.createdBy && (
                      <Crown className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Leave Group */}
            <Button
              variant="outline"
              className="w-full text-destructive hover:bg-destructive/10"
              onClick={handleLeave}
              disabled={isSubmitting}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Leave Group
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // If user is not in a family group, show create/join options
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-serif text-xl">
            <Users className="h-5 w-5 text-primary" />
            Family Sharing
          </DialogTitle>
          <DialogDescription>
            Create or join a family group to share recipes
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create Group</TabsTrigger>
            <TabsTrigger value="join">Join Group</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="groupName">Group Name</Label>
              <Input
                id="groupName"
                placeholder="e.g., Smith Family Recipes"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayNameCreate">Your Display Name (optional)</Label>
              <Input
                id="displayNameCreate"
                placeholder="e.g., Mom, Dad, Grandma..."
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <Button
              className="w-full"
              onClick={handleCreate}
              disabled={isSubmitting}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Create Family Group
            </Button>
          </TabsContent>

          <TabsContent value="join" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="inviteCode">Invite Code</Label>
              <Input
                id="inviteCode"
                placeholder="Enter 8-character code"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="font-mono uppercase"
                maxLength={8}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayNameJoin">Your Display Name (optional)</Label>
              <Input
                id="displayNameJoin"
                placeholder="e.g., Mom, Dad, Grandma..."
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <Button
              className="w-full"
              onClick={handleJoin}
              disabled={isSubmitting}
            >
              <Users className="h-4 w-4 mr-2" />
              Join Family Group
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
