"use client";

import { addToast } from "@heroui/toast";
import { BaseAddressAPI } from "@/types/api";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { LoadCreationStatus } from "../create/constants";
import {
  ContractInformation,
  LoadDetails,
  LoadInformationFeatures,
  LoadReadyState,
  LoadRoute,
  LoadVisibility,
  TrailerDetails,
  Workdays,
} from "../utils/types";

const CreateLoadContext = createContext<any | undefined>(undefined);

export const CreateLoadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  const [canGoForward, setCanGoForward] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [isOnSaving, setOnSaving] = useState(false);

  const [loadCreationState, setLoadCreationState] = useState(
    LoadCreationStatus.EnterLoadDetails,
  );

  const [isLoadDetailsValid, setLoadDetailsValidation] = useState(false);
  const [isLoadRouteValid, setLoadRouteValidation] = useState(false);
  const [isTrailerDetailsValid, setTrailerDetailsValidation] = useState(false);
  const [isContactInformationValid, setContactInformationValidation] =
    useState(false);
  const [isLoadVisibilityValid, setLoadVisibilityValidation] = useState(false);

  const [
    loadDetailsCompilationPercentage,
    setLoadDetailsCompilationPercentage,
  ] = useState(0);
  const [loadRouteCompilationPercentage, setLoadRouteCompilationPercentage] =
    useState(0);
  const [
    trailerDetailsCompilationPercentage,
    setTrailerDetailsCompilationPercentage,
  ] = useState(0);
  const [
    contactInformationCompilationPercentage,
    setContactInformationCompilationPercentage,
  ] = useState(0);
  const [
    loadVisibilityCompilationPercentage,
    setLoadVisibilityCompilationPercentage,
  ] = useState(0);

  const [loadDetails, setLoadDetails] = useState<LoadDetails>({
    name: "",
    weight: "",
    volume: "",
  });
  const [loadRoute, setLoadRoute] = useState<LoadRoute>({
    when: {
      state: LoadReadyState.LoadIsReadyAt,
    },
    uploading: {
      from: {
        location: "",
      },
    },
    downloading: {
      to: {
        location: "",
      },
    },
  });
  const [trailerDetails, setTrailerDetails] = useState<TrailerDetails>();
  const [contractInformation, setContractInformation] =
    useState<ContractInformation>();

  const [loadVisibility, setLoadVisibility] =
    useState<LoadInformationFeatures>();

  useEffect(() => {
    if (loadCreationState === LoadCreationStatus.EnterLoadDetails) {
      setCanGoForward(isLoadDetailsValid);
    } else if (loadCreationState === LoadCreationStatus.EnterRoute) {
      setCanGoForward(isLoadRouteValid);
    } else if (loadCreationState === LoadCreationStatus.EnterTraileDetails) {
      setCanGoForward(isTrailerDetailsValid);
    } else if (loadCreationState === LoadCreationStatus.EnterContactAndPrices) {
      setCanGoForward(isContactInformationValid);
    } else if (
      loadCreationState === LoadCreationStatus.SetLoadVisibilityAndStatus
    ) {
      setCanGoForward(isLoadVisibilityValid);
    }

    if (
      isLoadDetailsValid &&
      isLoadRouteValid &&
      isTrailerDetailsValid &&
      isContactInformationValid &&
      isLoadVisibilityValid &&
      !isOnSaving
    ) {
      setCanSave(true);
    } else {
      setCanSave(false);
    }
  }, [
    isLoadDetailsValid,
    isLoadRouteValid,
    isTrailerDetailsValid,
    isContactInformationValid,
    isLoadVisibilityValid,
    isOnSaving,
  ]);

  useEffect(() => {
    if (loadCreationState === LoadCreationStatus.EnterLoadDetails) {
      setCanGoForward(isLoadDetailsValid);
    } else if (loadCreationState === LoadCreationStatus.EnterRoute) {
      setCanGoForward(isLoadRouteValid);
    } else if (loadCreationState === LoadCreationStatus.EnterTraileDetails) {
      setCanGoForward(isTrailerDetailsValid);
    } else if (loadCreationState === LoadCreationStatus.EnterContactAndPrices) {
      setCanGoForward(isContactInformationValid);
    } else if (
      loadCreationState === LoadCreationStatus.SetLoadVisibilityAndStatus
    ) {
      setCanGoForward(isLoadVisibilityValid);
    }
    if (loadCreationState === LoadCreationStatus.EnterLoadDetails) {
      setCanGoBack(false);
    } else {
      setCanGoBack(true);
    }
  }, [loadCreationState]);

  useEffect(() => {
    let loadDetComp = !!(
      (loadDetails.name && loadDetails.weight) ||
      loadDetails.volume
    );
    setLoadDetailsValidation(loadDetComp);
    let percentLoadDet = 0;
    if (loadDetails.name) percentLoadDet += 50;
    if (loadDetails.weight || loadDetails.volume) percentLoadDet += 50;
    setLoadDetailsCompilationPercentage(percentLoadDet);
  }, [loadDetails]);

  useEffect(() => {
    let loadRouteComp = !!(
      loadRoute.when &&
      (loadRoute.when.state === LoadReadyState.LoadIsReadyAt
        ? loadRoute.when.dateInterval
        : true) &&
      loadRoute.uploading &&
      loadRoute.uploading.from &&
      loadRoute.uploading.from.address &&
      loadRoute.downloading &&
      loadRoute.downloading.to &&
      loadRoute.downloading.to.address
    );
    setLoadRouteValidation(loadRouteComp);

    let percentLoadRoute = 0;
    if (loadRoute.when) percentLoadRoute += 25; // Adjust percentage as needed
    if (
      loadRoute.uploading &&
      loadRoute.uploading.from &&
      loadRoute.uploading.from.address
    )
      percentLoadRoute += 25;
    if (
      loadRoute.downloading &&
      loadRoute.downloading.to &&
      loadRoute.downloading.to.address
    )
      percentLoadRoute += 25;
    if (
      loadRoute.when &&
      loadRoute.when.state === LoadReadyState.LoadIsReadyAt &&
      loadRoute.when.dateInterval
    )
      percentLoadRoute += 25; // Adjust percentage as needed
    setLoadRouteCompilationPercentage(percentLoadRoute);
  }, [loadRoute]);

  useEffect(() => {
    // Validation logic
    const trailerDetailsValidation = !!(
      trailerDetails && trailerDetails.trailerTypes?.length > 0
    );
    setTrailerDetailsValidation(trailerDetailsValidation);
    // Percentage calculation logic
    let trailerDetailsPercentage = 0;
    if (!trailerDetails) {
      setTrailerDetailsCompilationPercentage(trailerDetailsPercentage);
      return;
    }
    // Each field contributes to the percentage (total should sum to 100)
    if (trailerDetails.trailerTypes?.length > 0)
      trailerDetailsPercentage += 100;

    setTrailerDetailsCompilationPercentage(trailerDetailsPercentage);
  }, [trailerDetails]);

  useEffect(() => {
    // Validation logic
    const cInfoValidation = !!(
      contractInformation &&
      contractInformation.manager &&
      contractInformation.partner &&
      contractInformation.loadPrice &&
      contractInformation.loadPrice.amount > 0 &&
      contractInformation.shippingPrice &&
      contractInformation.shippingPrice.min.amount > 0 &&
      contractInformation.shippingPrice.max.amount > 0
    );
    setContactInformationValidation(cInfoValidation);
    // Percentage calculation logic
    let cInfoPerct = 0;
    if (!contractInformation) {
      setContactInformationCompilationPercentage(cInfoPerct);
      return;
    }
    // Each field contributes to the percentage (total should sum to 100)
    if (contractInformation.manager) cInfoPerct += 20;
    if (contractInformation.partner) cInfoPerct += 20;
    if (
      contractInformation.loadPrice &&
      contractInformation.loadPrice.amount > 0
    )
      cInfoPerct += 20;
    if (
      contractInformation.shippingPrice &&
      contractInformation.shippingPrice.min.amount > 0
    )
      cInfoPerct += 20;
    if (
      contractInformation.shippingPrice &&
      contractInformation.shippingPrice.max.amount > 0
    )
      cInfoPerct += 20;

    setContactInformationCompilationPercentage(cInfoPerct);
  }, [contractInformation]);

  useEffect(() => {
    // Validation logic
    const loadVisVal = !!(
      loadVisibility &&
      (loadVisibility.visibility === LoadVisibility.forEveryone ||
        (loadVisibility.visibility === LoadVisibility.forSelectedGroups &&
          loadVisibility?.selectedGroups) ||
        (loadVisibility.visibility === LoadVisibility.forSelectedUsers &&
          loadVisibility?.selectedUsers))
    );
    setLoadVisibilityValidation(loadVisVal);
    // Percentage calculation logic
    let lVisPercnt = 0;
    if (!loadVisibility) {
      setLoadVisibilityCompilationPercentage(lVisPercnt);
      return;
    }
    // Each field contributes to the percentage (total should sum to 100)
    if (
      loadVisibility.visibility === LoadVisibility.forEveryone ||
      (loadVisibility.visibility === LoadVisibility.forSelectedGroups &&
        loadVisibility?.selectedGroups) ||
      (loadVisibility.visibility === LoadVisibility.forSelectedUsers &&
        loadVisibility?.selectedUsers)
    )
      lVisPercnt += 100;

    setLoadVisibilityCompilationPercentage(lVisPercnt);
  }, [loadVisibility]);

  return (
    <CreateLoadContext.Provider value={{ loadCreationState }}>
      {children}
    </CreateLoadContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CreateLoadContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};
