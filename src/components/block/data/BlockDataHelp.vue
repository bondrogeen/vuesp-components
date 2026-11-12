<script setup lang="ts">
import VDialog from '@/components/ui/dialog/VDialog.vue';

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <VDialog title="Как настроить блок" size="md" @close="emit('close')">
    <div class="flex flex-col gap-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
      <section>
        <h5 class="mb-1 text-base font-semibold text-gray-900 dark:text-white">Блоки и данные</h5>
        <p>
          Слева выбери блок: «Солнце», «Сеть», «Батарея», «Дом», «Инвертор» или «Основное».
          Справа появятся его аргументы, показатели и направление.
        </p>
        <p class="mt-2">
          В поле выражения нажми иконку поиска — откроется дерево данных. Выбери значение,
          и в поле попадёт путь вида
          <code class="rounded bg-white/5 px-1.5 py-0.5">get('ports.16.value')</code>.
        </p>
      </section>

      <section>
        <h5 class="mb-1 text-base font-semibold text-gray-900 dark:text-white">Аргументы группы</h5>
        <p>
          Сначала добавь аргументы группы — до четырёх:
          <code class="rounded bg-white/5 px-1.5 py-0.5">a</code>,
          <code class="rounded bg-white/5 px-1.5 py-0.5">b</code>,
          <code class="rounded bg-white/5 px-1.5 py-0.5">c</code>,
          <code class="rounded bg-white/5 px-1.5 py-0.5">d</code>.
          Они общие для всех показателей этого блока, например солнца или батареи.
          Значение выбирается через дерево данных. Наведи на букву аргумента
          в выражении — появится его текущее значение.
        </p>

        <h5 class="mb-1 mt-4 text-base font-semibold text-gray-900 dark:text-white">Показатели</h5>
        <p>
          Кнопка «+» добавляет показатель. У показателя есть название, значение и формат.
          В значении используй аргументы группы, в формате —
          <code class="rounded bg-white/5 px-1.5 py-0.5">v</code>.
        </p>

        <pre class="glass-inset mt-2 overflow-x-auto rounded-md p-3 text-xs">a * b
a / 1000
a + ' Вт'</pre>

        <p class="mt-2">
          Порядок меняется перетаскиванием за точки, удалить показатель можно корзиной.
          До 10 показателей на блок. Иконка палитры открывает размер, цвет, начертание
          и выравнивание — только пресеты, без произвольного HTML и классов.
        </p>
      </section>

      <section>
        <h5 class="mb-1 text-base font-semibold text-gray-900 dark:text-white">Направление</h5>
        <p>
          У солнца, сети, батареи и дома есть отдельное поле «Направление».
          У солнца и дома — прямое, обратное или нет потока; у сети — импорт,
          экспорт или обмена нет; у батареи — зарядка, разрядка или без обмена.
        </p>
      </section>

      <section>
        <h5 class="mb-1 text-base font-semibold text-gray-900 dark:text-white">Выражения</h5>
        <p>
          Вместо готового пути можно написать выражение. Доступны корни
          <code class="rounded bg-white/5 px-1.5 py-0.5">device</code>,
          <code class="rounded bg-white/5 px-1.5 py-0.5">ports</code>,
          <code class="rounded bg-white/5 px-1.5 py-0.5">dallas</code>,
          <code class="rounded bg-white/5 px-1.5 py-0.5">info</code>,
          <code class="rounded bg-white/5 px-1.5 py-0.5">slots</code>
          и функции <code class="rounded bg-white/5 px-1.5 py-0.5">get</code>,
          <code class="rounded bg-white/5 px-1.5 py-0.5">scale</code>,
          <code class="rounded bg-white/5 px-1.5 py-0.5">num</code>,
          <code class="rounded bg-white/5 px-1.5 py-0.5">round</code>,
          <code class="rounded bg-white/5 px-1.5 py-0.5">clamp</code>.
        </p>

        <pre class="glass-inset mt-2 overflow-x-auto rounded-md p-3 text-xs">get('ports.16.value') / 100
scale(get('device.analog'), 0.1)
round(get('dallas.28aa.temp'), 1)
solarPower + gridPower - batteryPower</pre>
      </section>

      <section>
        <h5 class="mb-1 text-base font-semibold text-gray-900 dark:text-white">Значение и формат</h5>
        <p>
          В значении собери число из аргументов, а в формате добавь единицу, текст и перенос строки.
          В формате <code class="rounded bg-white/5 px-1.5 py-0.5">v</code> — уже вычисленное значение.
        </p>

        <pre class="glass-inset mt-2 overflow-x-auto rounded-md p-3 text-xs">v + ' кВт·ч'
v + ' %'
v.toFixed(0) + ' В'
v + ' кВт·ч&lt;br&gt;выработка за день'</pre>

        <p class="mt-2">
          <code class="rounded bg-white/5 px-1.5 py-0.5">&lt;br&gt;</code> и
          <code class="rounded bg-white/5 px-1.5 py-0.5">\n</code> дают перенос строки.
          Значения показателей собираются из аргументов, отдельные поля данных не нужны.
        </p>
      </section>

      <section>
        <h5 class="mb-1 text-base font-semibold text-gray-900 dark:text-white">Сохранение и перенос</h5>
        <p>
          Изменения сохраняются автоматически. Крестик просто закрывает окно.
          Иконки в шапке: справка, импорт JSON и экспорт JSON.
        </p>
      </section>

      <section>
        <h5 class="mb-1 text-base font-semibold text-gray-900 dark:text-white">Где хранится настройка</h5>
        <p>
          Конфиг блока хранится на самом устройстве или в хабе, а не в браузере.
          Поэтому настройки одинаковы на компьютере и телефоне.
        </p>
      </section>
    </div>
  </VDialog>
</template>
