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
  LoadingVolumeFeature,
  LoadReadyState,
  LoadRoute,
  LoadStatus,
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
  const [isForwardButtonVisible, setForwardButtonVisibility] = useState(true);

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
    weight: { value: 0, unit: "T" },
    volume: { value: 0, unit: "m3" },
  });
  const [loadRoute, setLoadRoute] = useState<LoadRoute>({
    when: {
      state: LoadReadyState.LoadIsReadyAt,
    },
    uploading: {
      location: "",
    },
    downloading: {
      location: "",
    },
  });

  const [trailerDetails, setTrailerDetails] = useState<TrailerDetails>({
    trailerTypes: [],
    loadingFeature: [],
    unloadingFeature: [],
    numberOfCars: 1,
    adr: 1,
    isTwoDriverRequired: false,
    loadingVolumeFeature: LoadingVolumeFeature.FTL,
  });
  const [contractInformation, setContractInformation] =
    useState<ContractInformation>({
      loadPrice: { value: 0, unit: "$" },
      shippingPrice: { min: 0, max: 0, unit: "$" },
    });

  const [loadVisibility, setLoadVisibility] = useState<LoadInformationFeatures>(
    { status: LoadStatus.Active, visibility: LoadVisibility.forSelectedUsers },
  );

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
    if (loadCreationState === LoadCreationStatus.SetLoadVisibilityAndStatus) {
      setForwardButtonVisibility(false);
    } else {
      setForwardButtonVisibility(true);
    }
  }, [loadCreationState]);

  useEffect(() => {
    let loadDetComp = !!(
      loadDetails.name &&
      ((loadDetails.weight && loadDetails.weight.value > 0) ||
        (loadDetails.volume && loadDetails.volume.value > 0))
    );
    setLoadDetailsValidation(loadDetComp);
    let percentLoadDet = 0;
    if (loadDetails.name) percentLoadDet += 50;
    if (
      (loadDetails.weight && loadDetails.weight.value > 0) ||
      (loadDetails.volume && loadDetails.volume.value > 0)
    )
      percentLoadDet += 50;
    setLoadDetailsCompilationPercentage(percentLoadDet);
  }, [loadDetails]);

  useEffect(() => {
    let loadRouteComp = !!(
      loadRoute.when &&
      (loadRoute.when.state === LoadReadyState.LoadIsReadyAt
        ? loadRoute.when.dateInterval
        : true) &&
      loadRoute.uploading &&
      loadRoute.uploading.address &&
      loadRoute.downloading &&
      loadRoute.downloading.address
    );
    setLoadRouteValidation(loadRouteComp);

    let percentLoadRoute = 0;
    if (loadRoute.uploading && loadRoute.uploading.address)
      percentLoadRoute += 50;
    if (loadRoute.downloading && loadRoute.downloading.address)
      percentLoadRoute += 50;
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
      contractInformation.loadPrice.value > 0 &&
      contractInformation.shippingPrice &&
      contractInformation.shippingPrice.min > 0 &&
      contractInformation.shippingPrice.max > 0
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
      contractInformation.loadPrice.value > 0
    )
      cInfoPerct += 20;
    if (
      contractInformation.shippingPrice &&
      contractInformation.shippingPrice.min > 0
    )
      cInfoPerct += 20;
    if (
      contractInformation.shippingPrice &&
      contractInformation.shippingPrice.max > 0
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

  const goBack = () => {
    if (canGoBack) {
      if (loadCreationState === LoadCreationStatus.EnterRoute) {
        setLoadCreationState(LoadCreationStatus.EnterLoadDetails);
      } else if (loadCreationState === LoadCreationStatus.EnterTraileDetails) {
        setLoadCreationState(LoadCreationStatus.EnterRoute);
      } else if (
        loadCreationState === LoadCreationStatus.EnterContactAndPrices
      ) {
        setLoadCreationState(LoadCreationStatus.EnterTraileDetails);
      } else if (
        loadCreationState === LoadCreationStatus.SetLoadVisibilityAndStatus
      ) {
        setLoadCreationState(LoadCreationStatus.EnterContactAndPrices);
      }
    }
  };

  const goForward = () => {
    if (canGoForward) {
      if (loadCreationState === LoadCreationStatus.EnterLoadDetails) {
        setLoadCreationState(LoadCreationStatus.EnterRoute);
      } else if (loadCreationState === LoadCreationStatus.EnterRoute) {
        setLoadCreationState(LoadCreationStatus.EnterTraileDetails);
      } else if (loadCreationState === LoadCreationStatus.EnterTraileDetails) {
        setLoadCreationState(LoadCreationStatus.EnterContactAndPrices);
      } else if (
        loadCreationState === LoadCreationStatus.EnterContactAndPrices
      ) {
        setLoadCreationState(LoadCreationStatus.SetLoadVisibilityAndStatus);
      }
    }
  };

  const updateLoadDetails = (ld: LoadDetails) => {
    setLoadDetails(ld);
  };
  const updateLoadRoute = (lr: LoadRoute) => {
    setLoadRoute(lr);
  };
  const updateTrailerDetails = (tr: TrailerDetails) => {
    setTrailerDetails(tr);
  };
  const updateContractInformation = (ci: ContractInformation) => {
    setContractInformation(ci);
  };
  const updateLoadVisibility = (lv: LoadInformationFeatures) => {
    console.log(lv);
    setLoadVisibility(lv);
  };

  return (
    <CreateLoadContext.Provider
      value={{
        loadCreationState,
        loadDetails,
        loadRoute,
        trailerDetails,
        contractInformation,
        loadVisibility,
        isLoadDetailsValid,
        isLoadRouteValid,
        isContactInformationValid,
        isTrailerDetailsValid,
        isLoadVisibilityValid,
        loadDetailsCompilationPercentage,
        loadRouteCompilationPercentage,
        trailerDetailsCompilationPercentage,
        contactInformationCompilationPercentage,
        loadVisibilityCompilationPercentage,
        isForwardButtonVisible,

        updateLoadDetails,
        updateLoadRoute,
        updateTrailerDetails,
        updateContractInformation,
        updateLoadVisibility,
        canGoBack,
        canGoForward,
        canSave,
        goBack,
        goForward,
      }}
    >
      {children}
    </CreateLoadContext.Provider>
  );
};

export const useLoadCreation = () => {
  const context = useContext(CreateLoadContext);
  if (!context) {
    throw new Error("useLoadCreation must be used within a CreateLoadProvider");
  }
  return context;
};
