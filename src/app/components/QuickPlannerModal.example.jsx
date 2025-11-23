/**
 * Example usage of QuickPlannerModal
 * 
 * This file shows how to use the QuickPlannerModal component.
 * You can import and use it in any page like this:
 */

import { useState } from "react";
import QuickPlannerModal from "./QuickPlannerModal";
import { Button } from "@lshay/ui/components/default/button";

export default function ExamplePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {/* Trigger button */}
      <Button
        onClick={() => setIsModalOpen(true)}
        className="hero-button-gradient hero-shine-animation px-8 py-3 rounded-full font-semibold text-sm hover:shadow-[0_0_25px_rgba(220,155,120,0.5)] transition-all duration-300 transform hover:scale-105"
      >
        Open 30-Second Planner
      </Button>

      {/* Modal */}
      <QuickPlannerModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}

