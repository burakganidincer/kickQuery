import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export type SelectedProps = {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

const Size = ({ selected, setSelected }: SelectedProps) => {
  const [params, setParams] = useSearchParams();

  const numbers = ["38", "39", "40", "41", "42", "43", "44", "45", "46", "47"];

  // Eğer numara state'de varsa çıkartır yoksa ekler
  const toggle = (num: string) => {
    const found = selected.find((i) => i === num);

    if (found) {
      setSelected(selected.filter((i) => i !== num));
    } else {
      setSelected([...selected, num]);
    }
  };

  useEffect(() => {
    if (selected.length > 0) {
      // Eğer seçili numaralar varsa aralarına , koyup URL'ye ekle
      params.set("size", selected.join(","));
      setParams(params);
    } else {
      // Eğer seçili numara yoksa URL'deki parametreyi kaldır
      params.delete("size");
      setParams(params);
    }
  }, [selected]);

  return (
    <div className="lg:mt-[20px]">
      <h2 className="font-semibold mb-[16px]">Numara</h2>

      <div className="grid grid-cols-5 gap-[16px]">
        {numbers.map((num) => {
          const found = selected.find((i) => i === num);

          return (
            <p
              key={num}
              onClick={() => toggle(num)}
              className={`py-[8px] px-[16px] lg:px-[0px] text-center rounded-md  cursor-pointer transition hover:bg-zinc-400 ${
                found ? "bg-black text-white" : "bg-white text-dark"
              }`}
            >
              <span>{num}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Size;
