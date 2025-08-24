"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Shipping,
  Driver,
  Transport,
  Passport,
  ShippingCreationState,
  PassportType,
} from "../types"; // adjust the import as per your project structure

const ShippingContext = createContext<any | undefined>(undefined);

export const ShippingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  const [shippingStep, setShippingStep] = useState<ShippingCreationState>(
    ShippingCreationState.PassportOfDriver,
  );

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [canSave, setCanSave] = useState(false);

  const [driver, setDriver] = useState<Driver>({
    name: "",
    surname: "",
    contacts: [{ id: 1, type: "Phone", data: "" }],
    passport: {
      type: 0,
    },
    driverCard: {
      type: 1,
    },
  });

  const [truck, setTruck] = useState<Transport>({
    name: "",
    carNumber: "",
    passport: {
      type: 3,
    },
  });

  const [trailer, setTrailer] = useState<Transport>({
    name: "",
    carNumber: "",
    passport: {
      type: 4,
    },
  });

  const [price, setPrice] = useState({ value: 1, unit: "$" });
  const [dispatcher, setDispatcher] = useState<any>(null);

  const isPassportValid = (passport: Passport): boolean =>
    passport?.type === PassportType.InternationalPassport
      ? !!passport?.frontSide
      : !!passport?.frontSide && !!passport?.backSide;

  const [isDriverPassportValid, setDriverPassportValid] = useState(false);
  const [isDriverCardValid, setDriverCardValid] = useState(false);
  const [isTruckPassportValid, setTruckPassportValid] = useState(false);
  const [isTrailerPassportValid, setTrailerPassportValid] = useState(false);
  const [isShippingDetailsValid, setShippingDetailsValid] = useState(false);
  const [isTruckImagesValid, setTruckImagesValid] = useState(false);

  const [driverPassportPercentage, setDriverPassportPercentage] = useState(0);
  const [truckPassportPercentage, setTruckPassportPercentage] = useState(0);
  const [trailerPassportPercentage, setTrailerPassportPercentage] = useState(0);

  useEffect(() => {
    setDriverCardValid(isPassportValid(driver.driverCard));
    setTrailerPassportValid(isPassportValid(trailer.passport));
    setShippingDetailsValid(price.value > 0);
    setTruckImagesValid(true);
  }, [driver, trailer, price]);

  useEffect(() => {
    const validations = {
      [ShippingCreationState.PassportOfDriver]: isDriverPassportValid,
      [ShippingCreationState.DriverCard]: isDriverCardValid,
      [ShippingCreationState.TruckPassport]: isTruckPassportValid,
      [ShippingCreationState.TrailerPassport]: isTrailerPassportValid,
      [ShippingCreationState.ShippingDetails]: isShippingDetailsValid,
      [ShippingCreationState.TruckImages]: isTruckImagesValid,
    };

    setCanGoForward(validations[shippingStep] ?? false);
    setCanSave(
      isDriverPassportValid &&
        isDriverCardValid &&
        isTruckPassportValid &&
        isTrailerPassportValid &&
        isShippingDetailsValid &&
        isTruckImagesValid,
    );

    setCanGoBack(shippingStep !== ShippingCreationState.PassportOfDriver);
  }, [
    shippingStep,
    isDriverPassportValid,
    isDriverCardValid,
    isTruckPassportValid,
    isTrailerPassportValid,
    isShippingDetailsValid,
    isTruckImagesValid,
  ]);

  const goForward = () => {
    if (!canGoForward) return;
    setShippingStep((prev) => (prev + 1) as ShippingCreationState);
  };

  const goBack = () => {
    if (!canGoBack) return;
    setShippingStep((prev) => (prev - 1) as ShippingCreationState);
  };

  const updateDriver = (d: Driver) => {
    setDriver(d);
    setDriverPassportValid(
      isPassportValid(d.passport) &&
        !!d.name &&
        !!d.surname &&
        !!d.contacts &&
        d.contacts.length > 0 &&
        !!d.contacts[0].data,
    );
    if (shippingStep === ShippingCreationState.PassportOfDriver) {
      var passPerc = 0;
      if (d) {
        if (d.name) {
          passPerc += 20;
        }
        if (d.surname) {
          passPerc += 20;
        }
        if (d.contacts && d.contacts.length > 0 && d.contacts[0].data) {
          passPerc += 20;
        }
        if (d.passport) {
          passPerc += d.passport.frontSide
            ? d.passport.type === PassportType.InternationalPassport
              ? 40
              : 20
            : 0;
          passPerc += d.passport.backSide
            ? d.passport.type === PassportType.InternationalPassport
              ? 0
              : 20
            : 0;
        }
      }
      setDriverPassportPercentage(passPerc);
    }
  };
  const updateTruck = (t: Transport) => {
    setTruck(t);
    setTruckPassportValid(
      isPassportValid(t.passport) && !!t.name && !!t.carNumber,
    );
    console.log(isPassportValid(t.passport) && !!t.name && !!t.carNumber);
    if (shippingStep === ShippingCreationState.TruckPassport) {
      var passPerc = 0;
      if (t) {
        if (t.name) {
          passPerc += 25;
        }
        if (t.carNumber) {
          passPerc += 25;
        }
        if (t.passport) {
          passPerc += t.passport.frontSide ? 25 : 0;
          passPerc += t.passport.backSide ? 25 : 0;
        }
      }
      setTruckPassportPercentage(passPerc);
    }
  };
  const updateTrailer = (t: Transport) => {
    setTrailer(t);
    setTrailerPassportValid(isPassportValid(t.passport) && !!t.carNumber);
    if (shippingStep === ShippingCreationState.TrailerPassport) {
      var passPerc = 0;
      if (t) {
        if (t.carNumber) {
          passPerc += 30;
        }
        if (t.passport) {
          passPerc += t.passport.frontSide ? 35 : 0;
          passPerc += t.passport.backSide ? 35 : 0;
        }
        console.log(passPerc);
      }
      setTrailerPassportPercentage(passPerc);
    }
  };
  const updatePrice = (p: { value: number; unit: string }) => setPrice(p);
  const updateDispatcher = (d: any) => setDispatcher(d);

  const getCompiledShipping = (): Shipping => ({
    driver,
    truck,
    trailer,
    price,
    dispatcher,
  });

  return (
    <ShippingContext.Provider
      value={{
        shippingStep,
        canGoBack,
        canGoForward,
        canSave,
        goBack,
        goForward,
        driver,
        truck,
        trailer,
        price,
        dispatcher,
        updateDriver,
        updateTruck,
        updateTrailer,
        updatePrice,
        updateDispatcher,
        getCompiledShipping,
        isDriverPassportValid,
        isDriverCardValid,
        isShippingDetailsValid,
        isTrailerPassportValid,
        isTruckImagesValid,
        isTruckPassportValid,
        driverPassportPercentage,
        truckPassportPercentage,
        trailerPassportPercentage,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
};

export const useShipping = () => {
  const context = useContext(ShippingContext);
  if (!context) {
    throw new Error("useShipping must be used within a ShippingProvider");
  }
  return context;
};
