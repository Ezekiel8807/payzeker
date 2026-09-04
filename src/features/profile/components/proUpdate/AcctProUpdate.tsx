"use client";
import { useState, useEffect, useRef } from "react";

//components
import ProUpdateForm from "@/features/profile/forms/ProUpdateForm";
import SuccessModal from "@/shared/components/modals/SuccessModal";
import ErrorModal from "@/shared/components/modals/ErrorModal";
import Button from "@/shared/components/ui/Button";
import ProfileField from "@/shared/components/ui/ProfileField";

//hooks
import useFormState from "@/shared/hooks/useFormState";

type Bank = {
  id: number;
  name: string;
  code: string;
  slug: string;
};

type AcctProUpdateProbs = {
  userAcctData: {
    fullname: string;
    username: string;
    bankName: string;
    bankAcctNo: string;
    setBankName: React.Dispatch<React.SetStateAction<string>>;
    setBankAcctNo: React.Dispatch<React.SetStateAction<string>>;
  };
};

export default function AcctProUpdate({ userAcctData }: AcctProUpdateProbs) {
  const { isPen, setIspen, isSuc, setIssuc, isErr, setIserr, errMsg, setErrmsg, sucMsg, setSucmsg } = useFormState();
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(true);
  const [accountName, setAccountName] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedBankName, setSelectedBankName] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    fullname,
    username,
    bankName,
    bankAcctNo,
    setBankName,
    setBankAcctNo,
  } = userAcctData;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        // Restore selected bank name if user clicks outside without selecting
        if (selectedBankName) {
          setSearchTerm(selectedBankName);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedBankName]);

  // Fetch banks on component mount
  useEffect(() => {
    async function fetchBanks() {
      try {
        const response = await fetch("/api/paystack/banks");
        const data = await response.json();

        if (data.status) {
          setBanks(data.data);
          // Set initial bank name if bankName (code) exists
          if (bankName) {
            const bank = data.data.find((b: Bank) => b.code === bankName);
            if (bank) {
              setSelectedBankName(bank.name);
              setSearchTerm(bank.name);
            }
          }
        } else {
          setErrmsg("Failed to load banks");
          setIserr(true);
        }
      } catch {
        setErrmsg("Failed to load banks");
        setIserr(true);
      } finally {
        setLoadingBanks(false);
      }
    }

    fetchBanks();
  }, [bankName]);

  // Filter banks based on search term
  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle bank selection
  const handleBankSelect = (bank: Bank) => {
    setBankName(bank.code);
    setSelectedBankName(bank.name);
    setSearchTerm(bank.name);
    setShowDropdown(false);
  };

  // Verify account number when both bank and account number are provided
  useEffect(() => {
    async function verifyAccount() {
      // Reset if conditions not met
      if (!bankName || bankAcctNo.length !== 10) {
        setAccountName("");
        setVerifying(false);
        return;
      }

      setVerifying(true);
      setAccountName(""); // Clear previous result

      try {
        const response = await fetch("/api/paystack/verifyAccount", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            account_number: bankAcctNo,
            bank_code: bankName,
          }),
        });

        const data = await response.json();

        if (data.status === true && data.data?.account_name) {
          setAccountName(data.data.account_name);
        } else {
          setAccountName("");
        }
      } catch {
        setAccountName("");
      } finally {
        setVerifying(false);
      }
    }

    // Debounce the verification
    const timeoutId = setTimeout(verifyAccount, 800);
    return () => clearTimeout(timeoutId);
  }, [bankName, bankAcctNo]);

  async function handleAccProUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Prevent multiple submissions
    if (isPen) return;

    // Validation
    if (!bankName) {
      setErrmsg("Please select a bank");
      setIserr(true);
      return;
    }

    if (bankAcctNo.length !== 10) {
      setErrmsg("Account number must be 10 digits");
      setIserr(true);
      return;
    }

    // Warn if account not verified but allow to proceed
    if (!accountName) {
      const proceed = confirm(
        "Account verification failed. Are you sure the details are correct?\n\nBank: " + selectedBankName + "\nAccount: " + bankAcctNo
      );
      if (!proceed) {
        return;
      }
    }

    //set pending to true
    setIspen(true);

    try {
      const response = await fetch(`/api/users/${username}?updateType=account`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bankName: selectedBankName, // Bank name (e.g., "Access Bank")
          bankCode: bankName, // Bank code (e.g., "044")
          bankAcctNo,
          username,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIssuc(true);
        setSucmsg(result.success);
      } else {
        setIserr(true);
        setErrmsg(result.error);
      }
    } catch {
      setIserr(true);
      setErrmsg("An error occurred while updating");
    } finally {
      //set pending to false
      setIspen(false);
    }
  }

  return (
    <ProUpdateForm handleForm={handleAccProUp} title="Account Information">
      <ProfileField label="Acct Name" htmlFor="acctName">
        <input
          className="input text-right"
          type="text"
          value={fullname}
          readOnly
          disabled
          name="acctName"
          id="acctName"
        />
      </ProfileField>

      <ProfileField label="Bank Name" htmlFor="bankName">
        <div className="relative" ref={dropdownRef}>
          <input
            type="text"
            className="input text-right"
            placeholder={loadingBanks ? "Loading banks..." : "Search for your bank..."}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            disabled={loadingBanks || isPen}
          />

          {showDropdown && filteredBanks.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-card max-h-60 overflow-y-auto slim-scroll">
              {filteredBanks.map((bank) => (
                <div
                  key={bank.code}
                  className="p-3 hover:bg-slate-50 cursor-pointer text-left border-b border-slate-100 last:border-b-0"
                  onClick={() => handleBankSelect(bank)}
                >
                  {bank.name}
                </div>
              ))}
            </div>
          )}

          {showDropdown && searchTerm && filteredBanks.length === 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-card p-3 text-ink-muted text-left">
              No banks found
            </div>
          )}

          {selectedBankName && !showDropdown && (
            <small className="block text-ink-soft text-right mt-1">
              Selected: {selectedBankName}
            </small>
          )}
        </div>
      </ProfileField>

      <ProfileField label="Acct NO" htmlFor="bankAcctNo">
        <div>
          <input
            className="input text-right"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={bankAcctNo.toString()}
            name="bankAcctNo"
            id="bankAcctNo"
            maxLength={10}
            disabled={isPen}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setBankAcctNo(value);
              }
            }}
          />
          {verifying && bankAcctNo.length === 10 && (
            <small className="block text-blue-500 text-right mt-1">
              Verifying account...
            </small>
          )}
          {accountName && !verifying && (
            <small className="block text-green-600 text-right mt-1 font-semibold">
              ✓ {accountName}
            </small>
          )}
          {!accountName && !verifying && bankAcctNo.length === 10 && bankName && (
            <small className="block text-yellow-600 text-right mt-1">
              ⚠ Verification unavailable (Test mode limit reached)
            </small>
          )}
          {bankAcctNo.length > 0 && bankAcctNo.length < 10 && (
            <small className="block text-ink-muted text-right mt-1">
              {10 - bankAcctNo.length} digits remaining
            </small>
          )}
        </div>
      </ProfileField>
      <div className="text-right mt-5">
        <Button 
          btnStyle={`btn w-[100px] font-bold text-[var(--white)] ${
            isPen || !bankName || bankAcctNo.length !== 10
              ? "bg-gray-400 cursor-not-allowed"
              : accountName
              ? "bg-[var(--green)] hover:bg-[var(--green-dark)]"
              : "bg-yellow-600 hover:bg-yellow-700"
          }`}
          disabled={isPen || !bankName || bankAcctNo.length !== 10}
        >
          {isPen ? "Updating..." : "Update"}
        </Button>
        {!accountName && bankName && bankAcctNo.length === 10 && !verifying && (
          <small className="block text-yellow-600 mt-2">
            ⚠ Proceeding without verification
          </small>
        )}
      </div>

      {isSuc && <SuccessModal setIssuc={setIssuc} sucMsg={sucMsg} />}
      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </ProUpdateForm>
  );
}
