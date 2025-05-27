
import { useState } from "react";
import { DataTable } from "../shared/DataTable";
import { ConfirmationDialog } from "../shared/ConfirmationDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import { useMockData, BankInfo } from "@/hooks/useMockData";

export const BankView = () => {
  const { bankInfo, setBankInfo } = useMockData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<BankInfo | null>(null);
  const [formData, setFormData] = useState({ 
    accountName: '', 
    accountNumber: '', 
    bankName: '',
    routingNumber: '',
    accountType: 'checking' as 'checking' | 'savings',
    isActive: true
  });

  const columns = [
    { key: 'accountName', label: 'Account Name', sortable: true },
    { key: 'accountNumber', label: 'Account Number', sortable: true },
    { key: 'bankName', label: 'Bank Name', sortable: true },
    { key: 'routingNumber', label: 'Routing Number', sortable: true },
    { key: 'accountType', label: 'Account Type', sortable: true },
    { 
      key: 'isActive', 
      label: 'Status', 
      render: (isActive: boolean) => (
        <Badge variant={isActive ? 'default' : 'secondary'}>
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
  ];

  const actions = [
    { icon: Eye, label: 'View', onClick: (bank: BankInfo) => handleView(bank), variant: 'ghost' as const },
    { icon: Edit, label: 'Edit', onClick: (bank: BankInfo) => handleEdit(bank), variant: 'ghost' as const },
    { icon: Trash2, label: 'Delete', onClick: (bank: BankInfo) => handleDelete(bank), variant: 'ghost' as const },
  ];

  const handleAdd = () => {
    setSelectedBank(null);
    setFormData({ 
      accountName: '', 
      accountNumber: '', 
      bankName: '',
      routingNumber: '',
      accountType: 'checking',
      isActive: true
    });
    setIsModalOpen(true);
  };

  const handleView = (bank: BankInfo) => {
    setSelectedBank(bank);
    setFormData({
      accountName: bank.accountName,
      accountNumber: bank.accountNumber,
      bankName: bank.bankName,
      routingNumber: bank.routingNumber,
      accountType: bank.accountType,
      isActive: bank.isActive
    });
    setIsModalOpen(true);
  };

  const handleEdit = (bank: BankInfo) => {
    setSelectedBank(bank);
    setFormData({
      accountName: bank.accountName,
      accountNumber: bank.accountNumber,
      bankName: bank.bankName,
      routingNumber: bank.routingNumber,
      accountType: bank.accountType,
      isActive: bank.isActive
    });
    setIsModalOpen(true);
  };

  const handleDelete = (bank: BankInfo) => {
    setSelectedBank(bank);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = () => {
    const newBank: BankInfo = {
      id: selectedBank?.id || Date.now().toString(),
      accountName: formData.accountName,
      accountNumber: formData.accountNumber,
      bankName: formData.bankName,
      routingNumber: formData.routingNumber,
      accountType: formData.accountType,
      isActive: formData.isActive,
    };

    if (selectedBank) {
      setBankInfo(bankInfo.map(b => b.id === selectedBank.id ? newBank : b));
    } else {
      setBankInfo([...bankInfo, newBank]);
    }

    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (selectedBank) {
      setBankInfo(bankInfo.filter(b => b.id !== selectedBank.id));
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <DataTable
        title="Bank Information Management"
        description="Manage bank accounts and financial information"
        data={bankInfo}
        columns={columns}
        actions={actions}
        onAdd={handleAdd}
        searchKey="accountName"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedBank ? 'Edit Bank Account' : 'Add New Bank Account'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                placeholder="Enter account name"
              />
            </div>
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                placeholder="Enter account number"
              />
            </div>
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                placeholder="Enter bank name"
              />
            </div>
            <div>
              <Label htmlFor="routingNumber">Routing Number</Label>
              <Input
                id="routingNumber"
                value={formData.routingNumber}
                onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value })}
                placeholder="Enter routing number"
              />
            </div>
            <div>
              <Label htmlFor="accountType">Account Type</Label>
              <Select value={formData.accountType} onValueChange={(value: any) => setFormData({ ...formData, accountType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">Checking</SelectItem>
                  <SelectItem value="savings">Savings</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="isActive">Status</Label>
              <Select value={formData.isActive.toString()} onValueChange={(value) => setFormData({ ...formData, isActive: value === 'true' })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {selectedBank ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Bank Account"
        description={`Are you sure you want to delete "${selectedBank?.accountName}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        confirmText="Delete"
        variant="destructive"
      />
    </>
  );
};
