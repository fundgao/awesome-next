"use client"; // for Next.js app router
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
} from "@worldcoin/idkit";

const app_id: any = process.env.APP_ID || "";
const action = process.env.ACTION_ID || "";

export default function Page() {
  const handleVerify = async (proof: ISuccessResult) => {
    const res = await fetch("/api/verify", {
      // route to your backend will depend on implementation
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    });
    if (!res.ok) {
      throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    }
  };

  const onSuccess = (result: ISuccessResult) => {
    // This is where you should perform frontend actions once a user has been verified
    window.alert(
      `Successfully verified with World ID!
        Your nullifier hash is: ` + result.nullifier_hash
    );
  };

  return (
    <IDKitWidget
      app_id={app_id} // obtained from the Developer Portal
      action={action} // obtained from the Developer Portal
      onSuccess={onSuccess} // callback when the modal is closed
      handleVerify={handleVerify} // callback when the proof is received
      verification_level={VerificationLevel.Orb}
    >
      {({ open }) => (
        // This is the button that will open the IDKit modal
        <button onClick={open}>Verify with World ID</button>
      )}
    </IDKitWidget>
  );
}
