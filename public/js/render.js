const renderSelects = (inputGroup, wrapperEl, callbacks) => {
    const divEl = document.createElement("div");
    divEl.classList.add("mb-3");
    divEl.innerHTML = `
  <select class="form-select" name="${inputGroup.title}">
    <option selected value="">${inputGroup.title}</option>
    ${inputGroup.inputs
      .map((input) => {
        return `<option value="${input.value}">${input.title}</option>`;
      })
      .join("\n")}
  </select>
  `;
    wrapperEl.append(divEl);
    const func = (e) => callbacks.select(inputGroup.title, e.target.value);
    divEl.querySelector("select").addEventListener("change", func);
    return {
      removeListeners: () =>
        divEl.querySelector("select").removeEventListener("change", func),
      el: divEl,
    };
  };
  
  const renderButtons = (inputGroup, wrapperEl, callbacks) => {
    const divEl = document.createElement("div");
    divEl.classList.add("mb-3");
    divEl.innerHTML = `
  <div class="btn-group">
    <span class="btn w-label">${inputGroup.title}</span>
    ${inputGroup.inputs
      .map((input, index) => {
        return `<button class="btn btn-outline-info variant" data-value="${input.value}">${index + 1}</button>`;
      })
      .join("\n")}
  </div>
  `;
    wrapperEl.append(divEl);
    const func = (e) => {
      e.preventDefault();
      const val = e.target.getAttribute("data-value");
      if (!val) {
        return;
      }
      divEl.querySelectorAll("button.variant").forEach((el) => el.classList.remove("active"))
      e.target.classList.add("active");
      callbacks.select(inputGroup.title, val)
    };
    divEl.addEventListener("click", func);
    return {
      removeListeners: () => {
        divEl.removeEventListener("click", func)
      },     
      el: divEl,
    };
  }
  
  const renderCharacter = (characterObj, wrapper) => {
    wrapper.innerHTML = ""
    const dir = `img/${characterObj.name}`
    for(let field in characterObj.fields) {
      if (!characterObj.fields[field]) {
        continue;
      }
      const imgEl = document.createElement('img');
      const fileName = `${dir}/${field}/${characterObj.fields[field].src}`;
      imgEl.src=fileName;
      imgEl.style.zIndex = characterObj.fields[field].index;
      wrapper.append(imgEl);
    }
    // console.log({ characterObj });
  };